import { Component } from '@angular/core';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss'],
})
export class CourseFilterComponent {
  constructor(private courseService: CoursesService) {}

  sortBy(sort: string) {
    this.courseService.getCourses(sort);
  }

  onEnter(event) {
    event.preventDefault();
  }
}
