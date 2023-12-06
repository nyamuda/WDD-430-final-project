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
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { FAQComponent } from './faq/faq.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialEditComponent } from './testimonials/testimonial-edit/testimonial-edit.component';
import { EmailVerificationComponent } from './email/email-verification/email-verification.component';
import { EmailVerificationResultComponent } from './email/email-verification/email-verification-result/email-verification-result.component';
import { EmailComponent } from './email/email.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetResultComponent } from './password/password-reset-result/password-reset-result.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },

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
    path: 'faq',
    component: FAQComponent,
  },
  {
    path: 'email-verification',
    component: EmailComponent,
    children: [
      { path: '', component: EmailVerificationComponent },
      {
        path: 'verify',
        component: EmailVerificationResultComponent,
      },
    ],
  },

  {
    path: 'testimonials',
    component: TestimonialsComponent,
    children: [
      {
        path: ':id/edit',
        component: TestimonialEditComponent,
        canActivate: [loggedInAuthGuard],
      },
      {
        path: 'new',
        component: TestimonialEditComponent,
        canActivate: [loggedInAuthGuard],
      },
    ],
  },
  {
    path: 'password',
    component: PasswordComponent,
    children: [
      {
        path: 'result',
        component: PasswordResetResultComponent,
      },
      {
        path: 'forgot',
        component: PasswordForgotComponent,
      },
      {
        path: 'reset',
        component: PasswordResetComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminAuthGuard],
  },

  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminAuthGuard],
  },

  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'login/oauth/google/callback',
    component: LoginComponent,
  },
  {
    path: 'login/oauth/facebook/callback',
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
    path: 'contact',
    component: ContactUsComponent,
  },

  {
    path: 'booking',
    component: BookingComponent,
    children: [
      {
        path: ':course',
        component: BookingComponent,
      },
    ],
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
