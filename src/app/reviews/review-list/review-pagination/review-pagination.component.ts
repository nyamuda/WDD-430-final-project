import { Component, Signal, computed } from '@angular/core';
import { MetaData, Review } from '../../review.model';
import { ReviewsService } from '../../reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-pagination',
  templateUrl: './review-pagination.component.html',
  styleUrls: ['./review-pagination.component.scss'],
})
export class ReviewPaginationComponent {
  constructor(private reviewService: ReviewsService, private router: Router) {}

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

    //scroll up to the top of the review list
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
