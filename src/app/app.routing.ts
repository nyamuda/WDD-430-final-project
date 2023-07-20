import { Routes } from '@angular/router';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CoursesComponent } from './courses/courses.component';
import { ReviewEditComponent } from './reviews/review-edit/review-edit.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: 'new', component: CourseEditComponent, canActivate: [AuthGuard] },
      {
        path: ':id',
        component: CourseDetailsComponent,
        children: [
          {
            path: 'reviews/:reviewId/edit',
            component: ReviewEditComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'reviews/new',
            component: ReviewEditComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
