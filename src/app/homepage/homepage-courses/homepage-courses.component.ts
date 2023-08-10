import { Component, Signal, computed, OnInit } from '@angular/core';
import { Course } from 'src/app/courses/course.model';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-homepage-courses',
  templateUrl: './homepage-courses.component.html',
  styleUrls: ['./homepage-courses.component.scss'],
})
export class HomepageCoursesComponent implements OnInit {
  placeholderCards: number[] = [0, 1, 2];
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    if (this.courses.length == 0) {
      this.courseService.getCourses();
    }
  }
  //Get the the first 3 courses from
  //a list of all courses
  courses: Signal<Course[]> = computed(() =>
    this.courseService
      .courseListSignal()
      .filter((val: Course, index: number) => index < 3)
  );
}
