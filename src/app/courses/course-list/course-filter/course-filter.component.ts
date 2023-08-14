import { Component, Signal, computed } from '@angular/core';
import { CoursesService } from '../../courses.service';
import { Course } from '../../course.model';

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

  courses: Signal<Course[]> = computed(() =>
    this.courseService.courseListSignal()
  );

  //display number of filtered results
  //in case the user searches for courses
  public displayNumSearchResults: Signal<boolean> = computed(() =>
    this.courseService.displayNumSearchResults()
  );
}
