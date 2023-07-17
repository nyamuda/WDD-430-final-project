import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ReviewsService } from '../../reviews/reviews.service';
import { Review } from '../../reviews/review.model';
import { ViewportScroller } from '@angular/common';

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
    private viewPortScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let courseId = params['id'];

      this.courseService.getCourseById(courseId).subscribe((course: Course) => {
        this.course = course;

        // The reviews for the course
        let reviews: Review[] = course.reviews;
        // Save the ID of the course to the review service
        this.reviewService.courseIdSignal.set(courseId);
        // Show the reviews for the course
        this.reviewService.reviewListSignal.set(reviews);
      });
    });
  }

  reviewCount: Signal<number> = computed(
    () => this.reviewService.reviewListSignal().length
  );

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id);
    this.router.navigateByUrl('courses');
  }

  updateCourse(id: string) {
    this.router.navigate(['courses', id, 'edit']);
  }
}
