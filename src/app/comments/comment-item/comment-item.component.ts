import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  @Input('comment-details') comment: Comment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentsService
  ) {}

  deleteComment(id: string) {
    this.commentService.deleteComment(id);

    this.router.navigateByUrl('/comments');
  }

  updateComment(id: string) {
    this.router.navigateByUrl(`/comments/new/${id}`);
  }
}
