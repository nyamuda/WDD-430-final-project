import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewEditComponent } from './reviews/review-edit/review-edit.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { MomentPipe } from './pipes/moment.pipe';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { HeaderComponent } from './header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageBackgroundImageComponent } from './homepage/homepage-background-image/homepage-background-image.component';
import { HomepageIntroductionComponent } from './homepage/homepage-introduction/homepage-introduction.component';
import { HomepageStatisticsComponent } from './homepage/homepage-statistics/homepage-statistics.component';
import { NgxAnimatedCounterModule } from '@bugsplat/ngx-animated-counter';
import { HomepageCoursesComponent } from './homepage/homepage-courses/homepage-courses.component';
import { HomepageTestimonialsComponent } from './homepage/homepage-testimonials/homepage-testimonials.component';
import { HomepageBookingComponent } from './homepage/homepage-booking/homepage-booking.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HomepageChooseUsComponent } from './homepage/homepage-choose-us/homepage-choose-us.component';
import { HomepageCallToActionComponent } from './homepage/homepage-call-to-action/homepage-call-to-action.component';
import { FooterComponent } from './footer.component';
import { CourseFilterComponent } from './courses/course-list/course-filter/course-filter.component';
import { StarRatingModule } from 'angular-star-rating';
import { ReviewPaginationComponent } from './reviews/review-list/review-pagination/review-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { QuillModule } from 'ngx-quill';
import { FilesComponent } from './files/files.component';
import { FileImageItemComponent } from './files/file-image-item/file-image-item.component';
import { UsersAccountComponent } from './users/users-account/users-account.component';
import { UsersAccountEditComponent } from './users/users-account-edit/users-account-edit.component';
import { UsersAccountDetailsComponent } from './users/users-account-details/users-account-details.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryViewComponent } from './gallery/gallery-view/gallery-view.component';
import { GalleryDeleteComponent } from './gallery/gallery-delete/gallery-delete.component';
import { GalleryAddComponent } from './gallery/gallery-add/gallery-add.component';
import { GalleryLoaderComponent } from './gallery/gallery-loader/gallery-loader.component';
import { BookingComponent } from './booking/booking.component';
import { BookingItemComponent } from './booking/booking-item/booking-item.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsItemComponent } from './contact-us/contact-us-item/contact-us-item.component';
import { OauthComponent } from './login/oauth/oauth.component';
import { TestimonialItemComponent } from './testimonials/testimonial-item/testimonial-item.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CompanyInfoComponent } from './admin/admin-dashboard/company-info/company-info.component';
import { CompanyInfoEditComponent } from './admin/admin-dashboard/company-info/company-info-edit/company-info-edit.component';
import { UserStatisticsComponent } from './admin/admin-dashboard/user-statistics/user-statistics.component';
import { BarChartComponent } from './admin/admin-dashboard/user-statistics/bar-chart/bar-chart.component';
import { WeekBarChartComponent } from './admin/admin-dashboard/user-statistics/bar-chart/week-bar-chart/week-bar-chart.component';
import { BookingsStatisticsComponent } from './admin/admin-dashboard/user-statistics/bookings-statistics/bookings-statistics.component';
import { LineChartComponent } from './admin/admin-dashboard/user-statistics/line-chart/line-chart.component';
import { FAQComponent } from './faq/faq.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialEditComponent } from './testimonials/testimonial-edit/testimonial-edit.component';
import { TestimonialListComponent } from './testimonials/testimonial-list/testimonial-list.component';
import { HomepageTestimonialItemComponent } from './homepage/homepage-testimonials/homepage-testimonial-item/homepage-testimonial-item.component';
import { TestimonialPaginationComponent } from './testimonials/testimonial-pagination/testimonial-pagination.component';
import { EmailVerificationComponent } from './email/email-verification/email-verification.component';
import { EmailVerificationResultComponent } from './email/email-verification/email-verification-result/email-verification-result.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';
import { PasswordResetResultComponent } from './password/password-reset-result/password-reset-result.component';
import { PasswordEmailComponent } from './password/password-email/password-email.component';
import { LoginItemComponent } from './login/login-item/login-item.component';
import { RegisterItemComponent } from './register/register-item/register-item.component';
import { TestimonialFilterComponent } from './testimonials/testimonial-filter/testimonial-filter.component';
import { StarsDistributionComponent } from './stars-distribution/stars-distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseItemComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    ReviewEditComponent,
    ReviewsComponent,
    ReviewItemComponent,
    ReviewEditComponent,
    ReviewListComponent,
    UsersComponent,
    MomentPipe,
    ConfirmationModalComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    HomepageComponent,
    HomepageBackgroundImageComponent,
    HomepageIntroductionComponent,
    HomepageStatisticsComponent,
    HomepageCoursesComponent,
    HomepageTestimonialsComponent,
    HomepageBookingComponent,
    HomepageChooseUsComponent,
    HomepageCallToActionComponent,
    FooterComponent,
    CourseFilterComponent,
    ReviewPaginationComponent,
    FilesComponent,
    FileImageItemComponent,
    UsersAccountComponent,
    UsersAccountEditComponent,
    UsersAccountDetailsComponent,
    GalleryComponent,
    GalleryViewComponent,
    GalleryDeleteComponent,
    GalleryAddComponent,
    GalleryLoaderComponent,
    BookingComponent,
    BookingItemComponent,
    ContactUsComponent,
    ContactUsItemComponent,
    OauthComponent,
    TestimonialItemComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    CompanyInfoComponent,
    CompanyInfoEditComponent,
    UserStatisticsComponent,
    BarChartComponent,
    WeekBarChartComponent,
    BookingsStatisticsComponent,
    LineChartComponent,
    FAQComponent,
    FaqEditComponent,
    TestimonialsComponent,
    TestimonialEditComponent,
    TestimonialListComponent,
    HomepageTestimonialItemComponent,
    TestimonialPaginationComponent,
    EmailVerificationComponent,
    EmailVerificationResultComponent,
    EmailComponent,
    PasswordComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    PasswordResetResultComponent,
    PasswordEmailComponent,
    LoginItemComponent,
    RegisterItemComponent,
    TestimonialFilterComponent,
    StarsDistributionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgxAnimatedCounterModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaterialTimepickerModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    GalleryModule,
    LightboxModule,

    FileUploadModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'], // Include only the options you want
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'video'],
          [{ header: 1 }, { header: 2 }],
        ],
      },
      theme: 'snow',
    }),
  ],
  providers: [
    { useValue: JWT_OPTIONS, provide: JWT_OPTIONS },
    JwtHelperService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
