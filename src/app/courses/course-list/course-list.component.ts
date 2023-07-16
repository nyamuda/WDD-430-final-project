import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = new Array<Course>();

  subscription: Subscription = new Subscription();

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    //if there are no current courses in the store
    if (this.courseService.courses.length == 0) {
      this.courseService.getCourses();
    } else {
      this.courses = this.courseService.courses;
    }
    this.subscription = this.courseService.courseListChangedEvent.subscribe(
      (courseList: Course[]) => {
        this.courses = courseList;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
