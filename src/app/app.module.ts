import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

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
import { CommentsComponent } from './comments/comments.component';
import { CommentItemComponent } from './comments/comment-item/comment-item.component';
import { CommentEditComponent } from './comments/comment-edit/comment-edit.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseItemComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CommentsComponent,
    CommentItemComponent,
    CommentEditComponent,
    CommentListComponent,
    UsersComponent,
    MomentPipe,
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
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
