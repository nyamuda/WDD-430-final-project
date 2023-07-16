import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentListChangedEvent = new Subject<Comment[]>();
  private _comments = new Array<Comment>();

  constructor(private http: HttpClient) {}

  //CREATE
  addComment(courseId: string, newComment: Comment) {
    if (!!newComment) {
      const url = 'http://localhost:8000/comments';
      const headers = this.headers();

      console.log(newComment.content);

      let commentDto = {
        content: newComment.content,
        userId: '64b2e98385921ebe20021281',
        courseId: courseId,
      };

      this.http.post(url, commentDto, { headers }).subscribe(
        (response) => {
          this.getComments();
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  getCommentById(id: string): Observable<Comment> {
    const headers = this.headers();
    const url = `http://localhost:8000/comments/${id}`;
    return this.http.get<Comment>(url, { headers });
  }

  //READ
  getComments(): Array<Comment> {
    const url = `http://localhost:8000/comments`;

    this.http.get<Comment[]>(url).subscribe(
      (comments: Comment[]) => {
        this._comments = comments;
        this.commentListChangedEvent.next(this._comments);
      },
      (error) => {
        console.error(error);
      }
    );
    return this._comments;
  }

  //UPDATE
  updateComment(id: string, newComment: Comment) {
    if (!!newComment) {
      const headers = this.headers();

      let commentDto = {
        content: newComment.content,
      };

      this.http
        .put(`http://localhost:8000/comments/${id}`, commentDto, { headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.getComments();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  //DELETE
  deleteComment(id: string) {
    const headers = this.headers();
    const url = `http://localhost:8000/comments/${id}`;

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.getComments();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAccessToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhdGVuZGFAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoiNjRiMmU5ODM4NTkyMWViZTIwMDIxMjgxIiwiaWF0IjoxNjg5NDQ4MzgwLCJleHAiOjE2ODk1MzQ3ODB9.qQullTgLNbnSh4hWlpPh4PA_tOkrhjfyIDjpr-j6RMs';
  }

  headers(): HttpHeaders {
    let token = this.getAccessToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
