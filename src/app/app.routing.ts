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
import {
  loggedInAuthGuard,
  adminAuthGuard,
  rightUserAuthGuard,
} from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { UsersAccountComponent } from './users/users-account/users-account.component';
import { UsersAccountDetailsComponent } from './users/users-account-details/users-account-details.component';
import { UsersAccountEditComponent } from './users/users-account-edit/users-account-edit.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomepageComponent },

  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CourseListComponent },
      {
        path: 'new',
        component: CourseEditComponent,
        canActivate: [adminAuthGuard],
      }, //only admins can add new courses
      {
        path: ':id',
        component: CourseDetailsComponent,
        children: [
          {
            path: 'reviews/:reviewId/edit',
            component: ReviewEditComponent,
            canActivate: [loggedInAuthGuard],
          },
          {
            path: 'reviews/new',
            component: ReviewEditComponent,
            canActivate: [loggedInAuthGuard],
          },
        ],
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
        canActivate: [adminAuthGuard], //only admins can edit courses
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
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'account',
    component: UsersAccountComponent,
    children: [
      {
        path: ':id',
        component: UsersAccountDetailsComponent,
        canActivate: [rightUserAuthGuard], //only logged in users
      },
      {
        path: ':id/edit',
        component: UsersAccountEditComponent,
        canActivate: [rightUserAuthGuard], //only logged in users
      },
    ],
  },
];
