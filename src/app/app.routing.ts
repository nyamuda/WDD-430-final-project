import { Routes } from '@angular/router';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CoursesComponent } from './courses/courses.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentsComponent } from './comments/comments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: 'new', component: CourseEditComponent },
      {
        path: ':id',
        component: CourseDetailsComponent,
        children: [
          { path: 'comments/:commentId/edit', component: CommentEditComponent },
          { path: 'comments/new', component: CommentEditComponent },
        ],
      },
      { path: ':id/edit', component: CourseEditComponent },
    ],
  },
];
