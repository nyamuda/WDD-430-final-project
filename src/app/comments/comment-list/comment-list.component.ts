import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input('comments') comments: Comment[] = new Array<Comment>();
  subscription: Subscription = new Subscription();

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    // this.commentService.getCommentsForCourse(courseId);
    this.subscription = this.commentService.commentListChangedEvent.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
