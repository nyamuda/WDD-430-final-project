import { Component, OnInit, OnDestroy, Signal, computed } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit, OnDestroy {
  placeholderReviews = [0, 1, 2];
  constructor(private reviewService: ReviewsService) {}

  ngOnInit() {}

  reviews: Signal<Review[]> = computed(() =>
    this.reviewService.reviewListSignal()
  );

  isFetchingReviews: Signal<boolean> = computed(() =>
    this.reviewService.isFetchingReviews()
  );

  ngOnDestroy() {}
}
