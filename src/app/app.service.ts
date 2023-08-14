import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './courses/course.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _courses = new Array<Course>();
  public courseListSignal: WritableSignal<Course[]> = signal(this._courses);

  constructor(private http: HttpClient) {}

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
}
