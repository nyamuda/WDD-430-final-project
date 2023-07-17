import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReviewsService } from '../reviews.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review.model';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.reviewFormGroup = this.formBuilder.group({
      content: ['', Validators.required],
    }); //Grab the course ID
    this.activatedRoute.parent.params.subscribe((params) => {
      this.courseId = params['id'];
    }); //Grab the review ID

    this.activatedRoute.params.subscribe((params) => {
      let reviewId = params['reviewId']; //if the id is not null //then it's editing mode

      if (!!reviewId) {
        this.reviewId = reviewId;
        this.reviewService
          .getReviewById(reviewId)
          .subscribe((review: Review) => {
            //if the review exists
            if (!!review) {
              this.editMode = true;
              this.reviewToEdit = review; //populate the form

              this.reviewFormGroup.patchValue({
                content: review.content,
              });
            }
          });
      } //else it's add new review mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.reviewFormGroup.valid) {
      let newReview = new Review();

      newReview.content = this.reviewFormGroup.controls['content'].value; //if in edit mode

      if (this.editMode) {
        this.reviewService.updateReview(this.reviewId, newReview);
      } //else if in new document mode
      else {
        this.reviewService.addReview(this.courseId, newReview);
      }
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
  }
}
