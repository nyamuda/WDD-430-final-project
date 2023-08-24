import { Injectable, signal, WritableSignal } from '@angular/core';
import { FileService } from '../files/file.service';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { SchoolGalleryItem } from './schoolGalleryItem.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private _gallery: SchoolGalleryItem[] = [];
  public galleryListSignal: WritableSignal<SchoolGalleryItem[]> = signal(
    this._gallery
  );
  public isUploadingItemSignal: WritableSignal<boolean> = signal(false);

  constructor(
    private fileService: FileService,
    private appService: AppService,
    private http: HttpClient,
    private userService: UsersService,
    private router: Router
  ) {}

  uploadGalleryItem() {
    //show the loader
    this.isUploadingItemSignal.set(true);
    //set headers
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    //upload the image and get the Firebase image Url
    this.fileService.uploadImage().subscribe((imageUrl: string) => {
      let url = 'http://localhost:8000/gallery';
      let galleryImageDto = {
        url: imageUrl,
        type: 'image',
      };

      //the save the image url to MongoDB database
      this.http.post(url, galleryImageDto, { headers }).subscribe(
        (response) => {
          this.appService.showSuccessToast('Image successfully uploaded!');
          this.getGalleryItems();
          //stop the loader
          this.isUploadingItemSignal.set(false);
          this.router.navigateByUrl('/gallery');
        },
        (error) => {
          this.appService.showFailureToast(
            'Something went wrong. Please try again later.'
          );
          //stop the loader
          this.isUploadingItemSignal.set(false);
        }
      );
    });
  }

  getGalleryItems() {
    const url = `http://localhost:8000/gallery`;
    this.http.get<SchoolGalleryItem[]>(url).subscribe(
      (galleryItems: SchoolGalleryItem[]) => {
        this._gallery = galleryItems;
        console.log(galleryItems);
        this.galleryListSignal.set(this._gallery);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteGalleryItem(id: string, itemUrl: string) {
    //first delete the image from Firebase
    await this.fileService.deleteImage(itemUrl);

    //then delete its url from MongoDB
    //set headers
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8000/files/${id}`;
    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getGalleryItems();
        this.appService.showSuccessToast(
          'The file has been deleted.',
          'Success!'
        );
      },
      (error) => {
        this.appService.showFailureToast(
          'There was an error during the course deletion process.',
          'File deletion failed'
        );
      }
    );
  }
}
