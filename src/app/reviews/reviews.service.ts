import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from './review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private _reviews = new Array<Review>();
  public reviewListSignal: WritableSignal<Review[]> = signal(this._reviews);
  public courseIdSignal: WritableSignal<string> = signal('');

  constructor(private http: HttpClient) {}

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
        },
        (error) => {
          console.error(error);
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
          },
          (error) => {
            console.error(error);
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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAccessToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhdGVuZGFAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoiNjRiMmU5ODM4NTkyMWViZTIwMDIxMjgxIiwiaWF0IjoxNjg5NTM4NDY1LCJleHAiOjE2ODk2MjQ4NjV9.hsfuGrQfV9G90K0dfExl2rHlynnU9nWnvIF4UoCbv-4';
  }

  headers(): HttpHeaders {
    let token = this.getAccessToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
