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
  addComment(newComment: Comment) {
    if (!!newComment) {
      const url = 'http://localhost:3000/comments';

      this.http.post(url, newComment).subscribe(
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
    const url = `http://localhost:3000/comments/${id}`;
    return this.http.get<Comment>(url);
  }

  //READ
  getComments(): Array<Comment> {
    const url = `http://localhost:3000/comments`;

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
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .put(`http://localhost:3000/comments/${id}`, newComment, { headers })
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
    const url = `http://localhost:3000/comments/${id}`;

    this.http.delete(url).subscribe(
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
