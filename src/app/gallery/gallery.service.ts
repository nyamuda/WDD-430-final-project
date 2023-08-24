import { Injectable, signal, WritableSignal } from '@angular/core';
import { FileService } from '../files/file.service';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { GalleryItem } from './galleryItem.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private _gallery: GalleryItem[] = [];
  public galleryListSignal: WritableSignal<GalleryItem[]> = signal(
    this._gallery
  );

  constructor(
    private fileService: FileService,
    private appService: AppService,
    private http: HttpClient,
    private userService: UsersService
  ) {}

  uploadGalleryItem() {
    //set headers
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    //upload the image and get the firebase image Url
    this.fileService.uploadImage().subscribe((imageUrl: string) => {
      let url = 'http://localhost:8000/gallery';
      let galleryImageDto = {
        url: imageUrl,
      };

      this.http.post(url, galleryImageDto, { headers }).subscribe(
        (response) => {
          this.appService.showSuccessToast('Image successfully uploaded!');
          this.getGalleryItems();
        },
        (error) => {
          this.appService.showFailureToast(
            'Something went wrong. Please try again later.'
          );
        }
      );
    });
  }

  getGalleryItems() {
    const url = `http://localhost:8000/gallery`;
    this.http.get<GalleryItem[]>(url).subscribe(
      (galleryItems: GalleryItem[]) => {
        this._gallery = galleryItems;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteGalleryItem(id: string, url: string) {
    //first delete the image from Firebase
    await this.fileService.deleteImage(url);

    //then delete its url from MongoDB
    //set headers
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
