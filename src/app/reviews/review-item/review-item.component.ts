import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent {
  @Input('review-details') review: Review;
  //the modal
  modalRef: MdbModalRef<ConfirmationModalComponent>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewsService,
    private modalService: MdbModalService
  ) {}

  deleteReview(id: string) {
    this.reviewService.deleteReview(id);
    this.router.navigateByUrl(
      `courses/${this.reviewService.courseIdSignal()}/#reviews`
    );
  }

  updateReview(id: string) {
    this.router.navigateByUrl(`/reviews/new/${id}`);
  }

  //Open the modal before deleting
  //its centered
  openModal(id: string) {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Please confirm deletion',
        message: 'Do you wish to proceed with deleting this review?',
        action: 'Delete',
      },
    });

    //if the deletion has been confirmed
    this.modalRef.onClose.subscribe((message) => {
      if (message === 'confirmed') {
        this.deleteReview(id);
      }
    });
  }
}
