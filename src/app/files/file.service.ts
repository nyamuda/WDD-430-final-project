import { Injectable, WritableSignal, signal } from '@angular/core';
import { map, Observable, of, catchError, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from '../users/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  //current uploaded image
  currentUpload: WritableSignal<File[]> = signal([]);
  isFileInvalid: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //Upload image
  //returns image URL
  uploadImage(): Observable<string> {
    //if an image has been uploaded
    if (this.currentUpload().length > 0 && !!this.currentUpload()[0]) {
      const formData = new FormData(); // Create a new FormData object
      formData.append('file', this.currentUpload()[0]); // Append the file to the form data

      const url = `http://localhost:8000/files`;

      let token = this.getJwtToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      let options = {
        headers: headers,
      };

      return this.http.post(url, formData, options).pipe(
        map((response) => {
          this.currentUpload.set([]); //clear the uploaded image
          return response['downloadURL']; // Return the response data
        }),
        catchError((error) => {
          // Handle errors if needed
          console.error('Error uploading course image:', error);
          return of(null);
        })
      );
    }
    //else return null
    else {
      return of(null);
    }
  }

  //Update image
  //by deleting the old image -- using the imageUrl
  //and returns the downloadURL of the new image
  updateImage(oldImageUrl: string): Observable<string> {
    if (this.currentUpload().length > 0 && !!this.currentUpload()[0]) {
      const formData = new FormData(); // Create a new FormData object
      formData.append('file', this.currentUpload()[0]); // Append the file to the form data
      formData.append('imageUrl', oldImageUrl);

      const url = `http://localhost:8000/files`;

      // Create the options object with headers and body
      let token = this.getJwtToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const options = {
        headers: headers,
        body: {
          imageUrl: oldImageUrl,
        },
      };

      //checking if the imageUrl is not null
      if (!oldImageUrl) {
        return this.uploadImage();
      }

      //1. Delete the old image using its URL
      return this.http.delete(url, options).pipe(
        switchMap((response) => {
          //2. Store the new image and get its download URL
          return this.uploadImage();
        }),
        catchError((error) => {
          //if the image trying to be deleted does not exists
          //processed with uploading a new image
          if (error.status === 404) {
            return this.uploadImage();
          }
          console.error('Error updating course image:', error);
          return of(null);
        })
      );
    }
    //else return null
    else {
      return of(null);
    }
  }

  //Delete image using its URL
  deleteImage(imageUrl: string) {
    const url = `http://localhost:8000/files`;

    // Create the options object with headers and body
    let token = this.getJwtToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = {
      headers: headers,
      body: {
        imageUrl,
      },
    };

    this.http.delete(url, options).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Get access token from local storage
  public getJwtToken(): string {
    //check if there is a token in session storage
    let sessionToken = sessionStorage.getItem('jwt_token');
    //check if there is a token in local storage
    let localToken = localStorage.getItem('jwt_token');

    //the current token
    let token = sessionToken ? sessionToken : localToken ? localToken : '';

    if (token) {
      //if the token has not expired
      if (!this.jwtHelper.isTokenExpired(token)) {
        return token;
      }
      return '';
    }

    return '';
  }
}
