import { Component, OnInit, OnDestroy, Signal, computed } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  placeholderCards: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    //if there are no current courses in the store
    if (this.courseService.courses.length == 0) {
      this.courseService.getCourses();
    }
  }

  courses: Signal<Course[]> = computed(() =>
    this.courseService.courseListSignal()
  );

  ngOnDestroy() {}
}
