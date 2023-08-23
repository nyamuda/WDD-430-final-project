import { Component, OnInit, Signal, computed } from '@angular/core';

import { CoursesService } from '../courses.service';
import { Course } from '../course.model';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  placeholderCards: number[] = [0, 1, 2];

  constructor(
    private courseService: CoursesService,
    private userService: UsersService,
    private appService: AppService
  ) {}

  ngOnInit() {
    //if there are no current courses in the store
    if (this.courseService.courseListSignal().length == 0) {
      this.courseService.getCourses();
    }
  }

  courses: Signal<Course[]> = computed(() =>
    this.courseService.courseListSignal()
  );

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //display placeholder courses
  //in case its fetching courses
  isFetchingCourses: Signal<boolean> = computed(() =>
    this.courseService.isFetchingCourses()
  );
  success() {
    this.appService.showSuccessToast('Course has been updated', '');
  }
  failure() {
    this.appService.showFailureToast('Course has been updated', 'Failure');
  }
}
