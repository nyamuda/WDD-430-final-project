import { Component, Signal, computed } from '@angular/core';
import { MetaData, Review } from '../../review.model';
import { ReviewsService } from '../../reviews.service';

@Component({
  selector: 'app-review-pagination',
  templateUrl: './review-pagination.component.html',
  styleUrls: ['./review-pagination.component.scss'],
})
export class ReviewPaginationComponent {
  constructor(private reviewService: ReviewsService) {}

  //Reviews meta data for pagination
  metaData: Signal<MetaData> = computed(() =>
    this.reviewService.metaDataSignal()
  );
  reviews: Signal<Review[]> = computed(() =>
    this.reviewService.reviewListSignal()
  );

  //Change reviews pagination number
  pageChanged(newPage) {
    let courseId = this.reviewService.courseIdSignal();
    //get reviews for the new page
    this.reviewService.getReviewsForCourse(courseId, newPage);
  }
}
