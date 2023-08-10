import { Component, OnInit, computed, Signal } from '@angular/core';
import { CoursesService } from './courses/courses.service';
import { Course } from './courses/course.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {}

  //Get the the first 3 courses from
  //a list of all courses
  courses: Signal<Course[]> = computed(() =>
    this.courseService
      .courseListSignal()
      .filter((val: Course, index: number) => index < 3)
  );
}
