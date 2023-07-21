import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course.model';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses = new Array<Course>();

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
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  getCourseById(id: string): Observable<Course> {
    if (this._courses.length != 0) {
      let course = this._courses.filter(
        (course: Course) => course['_id'] == id
      )[0];
      if (!!course) {
        return of(course);
      }
    }
    const url = `http://localhost:8000/courses/${id}`;
    return this.http.get<Course>(url);
  }

  //READ
  getCourses(): void {
    const url = `http://localhost:8000/courses`;

    this.http.get<Course[]>(url).subscribe(
      (courses: Course[]) => {
        this._courses = courses;
        this.courseListSignal.set(this._courses);
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
          },
          (error) => {
            console.error(error);
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
  showSuccess() {
    this.toastrService.success(
      `You can now log in with your credentials.`,
      'Registration Successful',
      {
        timeOut: 5000,
        progressAnimation: 'increasing',
        progressBar: true,
      }
    );
  }

  //Toast
  showFailure(message: string) {
    this.toastrService.error(`${message}`, 'Registration failed', {
      timeOut: 5000,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  }
}
