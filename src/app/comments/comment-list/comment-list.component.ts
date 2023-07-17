import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Signal,
  computed,
} from '@angular/core';
import { CommentsService } from '../comments.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  constructor(private commentService: CommentsService) {}

  ngOnInit() {}

  comments: Signal<Comment[]> = computed(() =>
    this.commentService.commentListSignal()
  );
  ngOnDestroy() {}
}
