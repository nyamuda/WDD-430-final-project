import {
  Injectable,
  signal,
  WritableSignal,
  Signal,
  computed,
} from '@angular/core';
import { map, Observable, of, catchError, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course.model';

import { UsersService } from '../users/users.service';
import { Review } from '../reviews/review.model';
import { response } from 'express';
import { Router } from '@angular/router';
import { FileService } from '../files/file.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses = new Array<Course>();

  //display placeholder courses
  //in case its fetching courses
  public isFetchingCourses: WritableSignal<boolean> = signal(false);

  //display placeholder course info
  //in case its fetching a particular course
  public isFetchingCourse: WritableSignal<boolean> = signal(false);

  //display number of search results
  //in case the user searches for courses
  public displayNumSearchResults: WritableSignal<boolean> = signal(false);

  public courseListSignal: WritableSignal<Course[]> = signal(this._courses);

  //show a loader during an HTTP POST OR UPDATE request
  public isProcessingRequest: WritableSignal<boolean> = signal(false);

  //show a loader during a search
  public isSearching: WritableSignal<boolean> = signal(false);

  //is there an uploaded image
  doesUploadExist: Signal<boolean> = computed(
    () => this.fileService.currentUpload().length > 0
  );

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private userService: UsersService,
    private router: Router,
    private fileService: FileService
  ) {}

  //CREATE
  addCourse(newCourse: Course) {
    if (!!newCourse) {
      //show loader
      this.isProcessingRequest.set(true);

      //First upload image
      //and get the URL of the image
      this.fileService.uploadImage().subscribe((imageUrl: string) => {
        //And then store the course to the database
        //together with the image URL
        const url = `${this.appService.apiUrl}/courses`;
        const headers = this.headers();
        let courseDto = {
          title: newCourse.title,
          fullDescription: newCourse.fullDescription,
          shortDescription: newCourse.shortDescription,
          imageUrl,
          price: newCourse.price,
        };

        this.http.post(url, courseDto, { headers }).subscribe(
          (response) => {
            //stop loader
            this.isProcessingRequest.set(false);
            this.getCourses();
            this.appService.showSuccessToast(
              'The course has been added to the database.',
              'Success!'
            );
            this.router.navigateByUrl('/courses');
          },
          (error) => {
            console.log(error);
            //stop loader
            this.isProcessingRequest.set(false);
            this.appService.showFailureToast(
              'Please review your data and try again.',
              'Failed to add course'
            );
          }
        );
      });
    }
  }
  getCourseById(id: string): Observable<Course> {
    this.isFetchingCourse.set(true);

    //check if the course is not already among the course list
    let courseExist: Course;
    if (this._courses.length > 0) {
      courseExist = this._courses.filter(
        (course: Course) => course['_id'] == id
      )[0];
    }
    if (courseExist) {
      return of(courseExist);
    }

    const url = `${this.appService.apiUrl}/courses/${id}`;

    return this.http.get<Course>(url);
  }

  //READ
  getCourses(sort = 'rating'): void {
    const url = `${this.appService.apiUrl}/courses?sort=${sort}`;
    this.isFetchingCourses.set(true);

    this.http.get<Course[]>(url).subscribe(
      (courses: Course[]) => {
        this._courses = courses;
        this.courseListSignal.set(this._courses);
        this.isFetchingCourses.set(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //UPDATE
  updateCourse(id: string, newCourse: Course) {
    let headers = this.headers();
    //show loader
    this.isProcessingRequest.set(true);
    let courseDto = {
      title: newCourse.title,
      fullDescription: newCourse.fullDescription,
      shortDescription: newCourse.shortDescription,
      imageUrl: newCourse.imageUrl,
      price: newCourse.price,
    };

    //first update the image
    //and get the new imageUrl
    this.fileService.updateImage(newCourse.imageUrl).subscribe((imageUrl) => {
      //update the imageUrl
      //if the returned imageUrl is null
      //in case the user did not upload a new image
      //assign the original imageUrl
      courseDto.imageUrl = !!imageUrl ? imageUrl : courseDto.imageUrl;

      //update the course
      this.http
        .put(`${this.appService.apiUrl}/courses/${id}`, courseDto, {
          headers,
        })
        .subscribe(
          (response) => {
            //stop loader
            this.isProcessingRequest.set(false);
            this.getCourses();

            this.appService.showSuccessToast(
              'The course has been updated',
              'Success!'
            );

            this.router.navigateByUrl('/courses/' + id);
          },
          (error) => {
            //stop loader
            this.isProcessingRequest.set(false);
            this.appService.showFailureToast(
              'Please review your changes and try again.',
              'Course update failed'
            );
          }
        );
    });
  }

  //DELETE
  async deleteCourse(id: string, imageUrl: string) {
    //first delete the course image
    await this.fileService.deleteImage(imageUrl);

    //then delete the course information
    const url = `${this.appService.apiUrl}/courses/${id}`;
    let headers = this.headers();

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getCourses();
        this.appService.showSuccessToast(
          'The course has been deleted.',
          'Success!'
        );
      },
      (error) => {
        this.appService.showFailureToast(
          'There was an error during the course deletion process.',
          'Course deletion failed'
        );
      }
    );
  }

  //Search courses by title
  searchCourses(title: string): void {
    const url = `${this.appService.apiUrl}/courses/search?title=${title}`;
    this.isSearching.set(true);

    this.http.get<Course[]>(url).subscribe(
      (courses: Course[]) => {
        this._courses = courses;
        this.courseListSignal.set(this._courses);

        this.displayNumSearchResults.set(true);
        this.isSearching.set(false);
      },
      (error) => {
        console.error(error);
        this.isSearching.set(false);
      }
    );
  }
  headers(): HttpHeaders {
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
