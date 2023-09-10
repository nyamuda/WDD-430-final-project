import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReviewsService } from '../reviews.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review.model';

import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { UsersService } from 'src/app/users/users.service';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss'],
})
export class ReviewEditComponent implements OnInit {
  reviewFormGroup!: FormGroup;
  editMode = false;
  reviewToEdit: Review = new Review();
  courseId = '';
  reviewId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewsService,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.reviewFormGroup = this.formBuilder.group({
      content: ['', Validators.required],
      stars: [1],
    }); //Grab the course ID
    this.activatedRoute.parent.params.subscribe((params) => {
      this.courseId = params['id'];
    });
    //Grab the review ID
    this.activatedRoute.params.subscribe((params) => {
      let reviewId = params['reviewId'];

      //if the id is not null
      //then it's editing mode
      if (!!reviewId) {
        this.reviewId = reviewId;
        this.reviewService
          .getReviewById(reviewId)
          .subscribe((review: Review) => {
            //if the review exists
            if (!!review) {
              this.editMode = true;
              this.reviewToEdit = review;

              //populate the form
              this.reviewFormGroup.patchValue({
                content: review.content,
                stars: review.stars,
              });
            }
          });
      } //else it's add 'new review' mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.reviewFormGroup.valid) {
      let newReview = new Review();

      newReview.content = this.reviewFormGroup.controls['content'].value;
      newReview.stars = this.reviewFormGroup.controls['stars'].value;
      newReview.courseId = this.reviewToEdit.courseId;

      //if in edit mode
      if (this.editMode) {
        this.reviewService.updateReview(this.reviewId, newReview);
      } //else if in new document mode
      else {
        this.reviewService.addReview(this.courseId, newReview);
      }
    }
  }

  //current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //placeholder image in case the reviewer
  //does not have a profile picture
  placeholderImageUrl: Signal<string> = computed(() =>
    this.userService.imagePlaceholderUrl(this.currentUser().name)
  );

  onCancel(event: Event) {
    event.preventDefault();
  }
}
