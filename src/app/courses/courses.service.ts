import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courseListChangedEvent = new Subject<Course[]>();
  private _courses = new Array<Course>();

  constructor(private http: HttpClient) {}

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
      return of(course);
    }
    const url = `http://localhost:8000/courses/${id}`;
    return this.http.get<Course>(url);
  }

  //READ
  getCourses(): void {
    const url = `http://localhost:8000/courses`;

    this.courseListChangedEvent.next([]);

    this.http.get<Course[]>(url).subscribe(
      (courses: Course[]) => {
        this._courses = courses;
        this.courseListChangedEvent.next(this._courses);
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
        console.log(response);
        this.getCourses();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAccessToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhdGVuZGFAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoiNjRiMmU5ODM4NTkyMWViZTIwMDIxMjgxIiwiaWF0IjoxNjg5NDQ4MzgwLCJleHAiOjE2ODk1MzQ3ODB9.qQullTgLNbnSh4hWlpPh4PA_tOkrhjfyIDjpr-j6RMs';
  }

  headers(): HttpHeaders {
    let token = this.getAccessToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
