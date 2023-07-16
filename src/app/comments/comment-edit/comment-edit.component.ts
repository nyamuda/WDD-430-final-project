import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommentsService } from '../comments.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
})
export class CommentEditComponent implements OnInit {
  commentFormGroup!: FormGroup;
  editMode = false;
  commentToEdit: Comment = new Comment();
  courseId = '';
  commentId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.commentFormGroup = this.formBuilder.group({
      content: ['', Validators.required],
    });
    //Grab the  course ID
    this.activatedRoute.parent.params.subscribe((params) => {
      this.courseId = params['id'];
    });

    //Grab the comment ID
    this.activatedRoute.params.subscribe((params) => {
      let commentId = params['commentId'];

      //if the id is not null
      //then its editing mode
      if (!!commentId) {
        this.commentId = commentId;
        this.commentService
          .getCommentById(commentId)
          .subscribe((comment: Comment) => {
            //if the comment exists
            if (!!comment) {
              this.editMode = true;
              this.commentToEdit = comment;

              //populate the form
              this.commentFormGroup.patchValue({
                content: comment.content,
              });
            }
          });
      }
      //else its add new comment mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.commentFormGroup.valid) {
      let newComment = new Comment();

      newComment.content = this.commentFormGroup.controls['content'].value;

      //if in edit mode
      if (this.editMode) {
        this.commentService.updateComment(this.commentId, newComment);
        this.router.navigateByUrl(`/courses/${this.courseId}`);
      }
      //else if in new document mode
      else {
        this.commentService.addComment(this.courseId, newComment);
        this.router.navigateByUrl(`/courses/${this.courseId}`);
      }
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl(`/courses/${this.courseId}`);
  }
}
