import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './courses/course.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _courses = new Array<Course>();
  public courseListSignal: WritableSignal<Course[]> = signal(this._courses);

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  //Get a list of courses from from the database
  getCourses(sort = 'rating'): void {
    const url = `http://localhost:8000/courses?sort=${sort}`;

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

  //Toast
  showSuccessToast(message: string, title: string, position = 'top-right') {
    this.toastr.success(`${message}`, `${title}`, {
      timeOut: 5000,
      // progressAnimation: 'increasing',
      // progressBar: true,
      positionClass: `toast-${position}`,
    });
  }

  //Toast
  showFailureToast(message: string, title: string, position = 'top-right') {
    this.toastr.error(`${message}`, `${title}`, {
      timeOut: 10000,
      // progressAnimation: 'increasing',
      // progressBar: true,
      positionClass: `toast-${position}`,
    });
  }
}
