import { Component, Signal, computed } from '@angular/core';
import { Course } from 'src/app/courses/course.model';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-homepage-courses',
  templateUrl: './homepage-courses.component.html',
  styleUrls: ['./homepage-courses.component.scss'],
})
export class HomepageCoursesComponent {
  placeholderCards: number[] = [0, 1, 2];
  constructor(private courseService: CoursesService) {}

  //Get the the first 3 courses from
  //a list of all courses
  courses: Signal<Course[]> = computed(() =>
    this.courseService
      .courseListSignal()
      .filter((val: Course, index: number) => index < 3)
  );
}
