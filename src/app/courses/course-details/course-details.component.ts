import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ReviewsService } from '../../reviews/reviews.service';
import { Review } from '../../reviews/review.model';
import { ViewportScroller } from '@angular/common';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course = new Course();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private reviewService: ReviewsService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let courseId = params['id'];

      this.courseService.getCourseById(courseId).subscribe((course: Course) => {
        this.course = course;
        // Save the ID of the course to the review service
        this.reviewService.courseIdSignal.set(courseId);
        //Get the reviews for the course
        this.reviewService.getReviewsForCourse(courseId);
      });
    });
  }

  reviewCount: Signal<number> = computed(
    () => this.reviewService.metaDataSignal().totalItems
  );

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id);
    this.router.navigateByUrl('courses');
  }

  updateCourse(id: string) {
    this.router.navigate(['courses', id, 'edit']);
  }

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //only admins have the authority to edit or delete courses
  isAdmin(): boolean {
    return this.currentUser().isAdmin;
  }
}
