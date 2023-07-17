import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent {
  @Input('review-details') review: Review;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewsService
  ) {}

  deleteReview(id: string) {
    this.reviewService.deleteReview(id);
    this.router.navigateByUrl(`courses/${this.reviewService.courseIdSignal()}`);
  }

  updateReview(id: string) {
    this.router.navigateByUrl(`/reviews/new/${id}`);
  }
}
