import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Signal,
  computed,
} from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit, OnDestroy {
  constructor(private reviewService: ReviewsService) {}

  ngOnInit() {}

  reviews: Signal<Review[]> = computed(() =>
    this.reviewService.reviewListSignal()
  );

  ngOnDestroy() {}
}
