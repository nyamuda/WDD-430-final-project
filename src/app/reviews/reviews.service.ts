import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review, ReviewMetaDto } from './review.model';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { AppService } from '../app.service';
import { MetaData } from '../app.meta';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private _reviews = new Array<Review>();
  //meta data for pagination
  private _metaData = new MetaData(0, 0, 0);

  //Signals
  public reviewListSignal: WritableSignal<Review[]> = signal(this._reviews);
  public metaDataSignal: WritableSignal<MetaData> = signal(this._metaData);
  public courseIdSignal: WritableSignal<string> = signal('');
  //display placeholder reviews
  //in case its fetching reviews
  public isFetchingReviews: WritableSignal<boolean> = signal(false);
  //information about the logged in user
  public loggedInUser: Signal<User> = computed(() => this.userService.user());

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private userService: UsersService
  ) {}

  // CREATE
  addReview(courseId: string, newReview: Review) {
    if (!!newReview) {
      const url = 'http://localhost:8000/reviews';
      const headers = this.headers();

      let reviewDto = {
        content: newReview.content,
        userId: this.loggedInUser()['_id'],
        courseId: courseId,
        stars: newReview.stars,
      };

      this.http.post(url, reviewDto, { headers }).subscribe(
        (response) => {
          this.getReviewsForCourse(this.courseIdSignal());
          //show toast
          this.appService.showSuccessToast(
            'We appreciate your valuable feedback!',
            'Thank you for your review'
          );
        },
        (error) => {
          this.appService.showFailureToast(
            "We're sorry, but there was an error submitting your review. Please try again later.",
            'Review submission failed'
          );
        }
      );
    }
  }

  getReviewById(id: string): Observable<Review> {
    const url = `http://localhost:8000/reviews/${id}`;
    return this.http.get<Review>(url);
  }

  // READ
  getReviewsForCourse(courseId: string, page: number = 1) {
    //show placeholder reviews
    this.isFetchingReviews.set(true);
    const url = `http://localhost:8000/courses/${courseId}/reviews?page=${page}`;

    //get the reviews
    //and meta data for pagination
    this.http.get<ReviewMetaDto>(url).subscribe(
      (response: ReviewMetaDto) => {
        //save the reviews
        this._reviews = response.reviews;
        this.reviewListSignal.set(response.reviews);

        //save the meta data
        //meta data for pagination
        let meta = new MetaData(
          response.meta.totalItems,
          response.meta.currentPage,
          response.meta.pageSize
        );
        this.metaDataSignal.set(meta);

        //stop placeholder reviews
        this.isFetchingReviews.set(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // UPDATE
  updateReview(id: string, newReview: Review) {
    if (!!newReview) {
      const headers = this.headers();

      let reviewDto = {
        courseId: newReview.courseId,
        content: newReview.content,
        stars: newReview.stars,
      };

      this.http
        .put(`http://localhost:8000/reviews/${id}`, reviewDto, { headers })
        .subscribe(
          (response) => {
            this.getReviewsForCourse(this.courseIdSignal());
            this.appService.showSuccessToast(
              'Thank you for your revised feedback!',
              'Review updated'
            );
          },
          (error) => {
            this.appService.showFailureToast(
              "We're sorry, but there was an error updating your review. Please try again later.",
              'Review update failed'
            );
          }
        );
    }
  }

  // DELETE
  deleteReview(id: string) {
    const headers = this.headers();
    const url = `http://localhost:8000/reviews/${id}`;

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getReviewsForCourse(this.courseIdSignal());
        this.appService.showSuccessToast(
          'Your review has been successfully removed.',
          'Review deleted successfully'
        );
      },
      (error) => {
        this.appService.showFailureToast(
          "We're sorry, but there was an error deleting your review. Please try again later.",
          'Failed to delete review'
        );
      }
    );
  }

  headers(): HttpHeaders {
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
