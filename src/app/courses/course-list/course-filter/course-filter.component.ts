import { Component } from '@angular/core';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss'],
})
export class CourseFilterComponent {
  sortingField = 'rating';

  constructor(private courseService: CoursesService) {}

  sortBy() {
    this.courseService.getCourses(this.sortingField);
  }

  onEnter(event) {
    event.preventDefault();

    this.courseService.searchCourses(event.target.value.trim());
  }
}
