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
  search = '';

  constructor(private courseService: CoursesService) {}

  //Sort the courses by a given field
  sortBy() {
    //if there are no courses available
    if (this.courses().length == 0) {
      this.courseService.getCourses(this.sortingField);
    }
    //else sort the currently available courses
    else {
      switch (this.sortingField) {
        //sort by title
        case 'title':
          this.courseService.courseListSignal.set(
            this.sortByTitle(this.courses())
          );
          break;
        //sort by reviews
        case 'reviews':
          this.courseService.courseListSignal.set(
            this.sortByReviewsCount(this.courses())
          );
          break;
        //else sort by rating
        default:
          this.courseService.courseListSignal.set(
            this.sortByRating(this.courses())
          );
          break;
      }
    }
  }

  onEnter() {
    this.courseService.searchCourses(this.search.trim());
  }

  courses: Signal<Course[]> = computed(() =>
    this.courseService.courseListSignal()
  );

  //display number of filtered results
  //in case the user searches for courses
  displayNumSearchResults: Signal<boolean> = computed(() =>
    this.courseService.displayNumSearchResults()
  );

  //display loader when searching for courses
  displaySearchLoader: Signal<boolean> = computed(() =>
    this.courseService.isSearching()
  );

  //sort the courses
  sortByTitle(courses: Course[]): Course[] {
    return courses.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByRating(courses: Course[]): Course[] {
    return courses.slice().sort((a, b) => b.rating - a.rating);
  }

  sortByReviewsCount(courses: Course[]): Course[] {
    return courses.slice().sort((a, b) => b.reviews.length - a.reviews.length);
  }
}
