import { Component, Signal, computed, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Course } from 'src/app/courses/course.model';

@Component({
  selector: 'app-homepage-courses',
  templateUrl: './homepage-courses.component.html',
  styleUrls: ['./homepage-courses.component.scss'],
})
export class HomepageCoursesComponent implements OnInit {
  placeholderCards: number[] = [0, 1, 2];

  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  //display the top 3 rated courses on the homepage
  courses: Signal<Course[]> = computed(() =>
    this.appService
      .courseListSignal()
      .filter((val: Course, index: number) => index < 3)
  );
}
