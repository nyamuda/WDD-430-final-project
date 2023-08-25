import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ReviewsService } from '../../reviews/reviews.service';
import { Review } from '../../reviews/review.model';
import { ViewportScroller } from '@angular/common';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  //the modal
  modalRef: MdbModalRef<ConfirmationModalComponent>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private reviewService: ReviewsService,
    private userService: UsersService,
    private modalService: MdbModalService
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

        //stop displaying a placeholder image
        this.courseService.isFetchingCourse.set(false);
      });
    });
  }

  reviewCount: Signal<number> = computed(
    () => this.reviewService.metaDataSignal().totalItems
  );

  deleteCourse(id: string, imageUrl: string) {
    this.courseService.deleteCourse(id, imageUrl);
    this.router.navigateByUrl('courses');
  }

  updateCourse(id: string) {
    this.router.navigate(['courses', id, 'edit']);
  }

  //information about whether the course information is being fetched
  isFetchingCourse: Signal<boolean> = computed(() =>
    this.courseService.isFetchingCourse()
  );

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //only admins have the authority to edit or delete courses
  isAdmin(): boolean {
    return this.currentUser().isAdmin;
  }

  //Open the modal before deleting a course
  //its centered
  openModal(id: string, imageUrl: string) {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Please confirm deletion',
        message: 'Do you wish to proceed with deleting this course?',
        action: 'Delete',
      },
    });

    //if the deletion has been confirmed
    this.modalRef.onClose.subscribe((message) => {
      if (message === 'confirmed') {
        this.deleteCourse(id, imageUrl);
      }
    });
  }
}
