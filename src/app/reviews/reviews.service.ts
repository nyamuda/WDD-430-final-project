import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from './review.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private _reviews = new Array<Review>();
  public reviewListSignal: WritableSignal<Review[]> = signal(this._reviews);
  public courseIdSignal: WritableSignal<string> = signal('');

  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  // CREATE
  addReview(courseId: string, newReview: Review) {
    if (!!newReview) {
      const url = 'http://localhost:8000/reviews';
      const headers = this.headers();

      console.log(newReview.content);

      let reviewDto = {
        content: newReview.content,
        userId: '64b2e98385921ebe20021281',
        courseId: courseId,
      };

      this.http.post(url, reviewDto, { headers }).subscribe(
        (response) => {
          this.getReviewsForCourse(this.courseIdSignal());
          //show toast
          this.showSuccess(
            'We appreciate your valuable feedback!',
            'Thank you for your review'
          );
        },
        (error) => {
          this.showFailure(
            "We're sorry, but there was an error submitting your review. Please try again later.",
            'Review submission failed'
          );
        }
      );
    }
  }

  getReviewById(id: string): Observable<Review> {
    const headers = this.headers();
    const url = `http://localhost:8000/reviews/${id}`;
    return this.http.get<Review>(url, { headers });
  }

  // READ
  getReviewsForCourse(courseId: string) {
    const url = `http://localhost:8000/courses/${courseId}/reviews`;

    this.http.get<Review[]>(url).subscribe(
      (reviews: Review[]) => {
        this._reviews = reviews;
        this.reviewListSignal.set(reviews);
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
        content: newReview.content,
      };

      this.http
        .put(`http://localhost:8000/reviews/${id}`, reviewDto, { headers })
        .subscribe(
          (response) => {
            this.getReviewsForCourse(this.courseIdSignal());
            this.showSuccess(
              'Thank you for your revised feedback!',
              'Review updated'
            );
          },
          (error) => {
            this.showFailure(
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
        this.showSuccess(
          'Your review has been successfully removed.',
          'Review deleted successfully'
        );
      },
      (error) => {
        this.showFailure(
          "We're sorry, but there was an error deleting your review. Please try again later.",
          'Failed to delete review'
        );
      }
    );
  }

  getAccessToken(): string {
    //check if there is a token in session storage
    let sessionToken = sessionStorage.getItem('jwt_token');
    //check if there is a token in local storage
    let localToken = localStorage.getItem('jwt_token');

    //the current token
    let token = sessionToken ? sessionToken : localToken;

    return token;
  }

  headers(): HttpHeaders {
    let token = this.getAccessToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }

  //Toast
  showSuccess(message: string, title: string) {
    this.toastrService.success(`${message}`, `${title}`, {
      timeOut: 10000,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  }

  //Toast
  showFailure(message: string, title: string) {
    this.toastrService.error(`${message}`, `${title}`, {
      timeOut: 10000,
      progressAnimation: 'increasing',
      progressBar: true,
    });
  }
}
