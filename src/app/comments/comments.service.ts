import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _comments = new Array<Comment>();
  public commentListSignal: WritableSignal<Comment[]> = signal(this._comments);
  public courseIdSignal: WritableSignal<string> = signal('');

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
          this.getCommentsForCourse(this.courseIdSignal());
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
  getCommentsForCourse(courseId: string) {
    const url = `http://localhost:8000/courses/${courseId}/comments`;

    this.http.get<Comment[]>(url).subscribe(
      (comments: Comment[]) => {
        this._comments = comments;

        this.commentListSignal.set(comments);
      },
      (error) => {
        console.error(error);
      }
    );
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
            this.getCommentsForCourse(this.courseIdSignal());
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
        this.getCommentsForCourse(this.courseIdSignal());
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
