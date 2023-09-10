import { Component, OnInit, computed, Signal } from '@angular/core';
import { Course } from './courses/course.model';

import { AppService } from './app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  //display the top 5 rated courses on the homepage
  courses: Signal<Course[]> = computed(() =>
    this.appService
      .courseListSignal()
      .filter((val: Course, index: number) => index < 5)
  );
}
