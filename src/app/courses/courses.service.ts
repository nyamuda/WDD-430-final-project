import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course.model';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users/users.service';
import { Review } from '../reviews/review.model';

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

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private userService: UsersService
  ) {}

  //CREATE
  addCourse(newCourse: Course) {
    if (!!newCourse) {
      const url = 'http://localhost:8000/courses';
      const headers = this.headers();
      let courseDto = {
        title: newCourse.title,
        description: newCourse.description,
        imageUrl: newCourse.imageUrl,
        price: newCourse.price,
      };

      this.http.post(url, courseDto, { headers }).subscribe(
        (response) => {
          this.getCourses();
          this.showSuccess(
            'The course has been added to the database.',
            'Success!'
          );
        },
        (error) => {
          this.showFailure(
            'Please review your data and try again.',
            'Failed to add course'
          );
        }
      );
    }
  }
  getCourseById(id: string): Observable<Course> {
    this.isFetchingCourse.set(true);

    if (this._courses.length != 0) {
      let course = this._courses.filter(
        (course: Course) => course['_id'] == id
      )[0];
      if (!!course) {
        this.isFetchingCourse.set(false);
        return of(course);
      }
    }
    const url = `http://localhost:8000/courses/${id}`;

    return this.http.get<Course>(url);
  }

  //READ
  getCourses(sort = 'rating'): void {
    const url = `http://localhost:8000/courses?sort=${sort}`;
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
    if (!!newCourse) {
      let headers = this.headers();
      let courseDto = {
        title: newCourse.title,
        description: newCourse.description,
        imageUrl: newCourse.imageUrl,
        price: newCourse.price,
      };
      this.http
        .put(`http://localhost:8000/courses/${id}`, courseDto, { headers })
        .subscribe(
          (response) => {
            this.getCourses();
            this.showSuccess('The course has been updated', 'Success!');
          },
          (error) => {
            this.showFailure(
              'Please review your changes and try again.',
              'Course update failed'
            );
          }
        );
    }
  }

  //DELETE
  deleteCourse(id: string) {
    const url = `http://localhost:8000/courses/${id}`;
    let headers = this.headers();

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getCourses();
        this.showSuccess('The course has been deleted.', 'Success!');
      },
      (error) => {
        this.showFailure(
          'There was an error during the course deletion process.',
          'Course deletion failed'
        );
      }
    );
  }

  //Search courses by title
  searchCourses(title: string): void {
    const url = `http://localhost:8000/courses/search?title=${title}`;

    this.http.get<Course[]>(url).subscribe(
      (courses: Course[]) => {
        this._courses = courses;
        this.courseListSignal.set(this._courses);

        this.displayNumSearchResults.set(true);
      },
      (error) => {
        console.error(error);
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

  //a getter for _courses
  public get courses(): Array<Course> {
    return this._courses;
  }

  //Toast
  showSuccess(message: string, title: string) {
    this.toastrService.success(`${message}`, `${title}`, {
      timeOut: 10000,
      progressAnimation: 'increasing',
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  //Toast
  showFailure(message: string, title: string) {
    this.toastrService.error(`${message}`, `${title}`, {
      timeOut: 10000,
      progressAnimation: 'increasing',
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }
}
