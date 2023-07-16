import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { CommentsService } from '../../comments/comments.service';
import { Comment } from '../../comments/comment.model';
import { throws } from 'assert';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course = new Course();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private commentService: CommentsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let courseId = params['id'];

      this.courseService.getCourseById(courseId).subscribe((course: Course) => {
        this.course = course;

        //The comments for course
        let comments: Comment[] = course.comments;
        //save the ID of the course to the comment service
        this.commentService.courseIdChangeEvent.next(courseId);
        //show the comments for the course
        this.commentService.commentListChangedEvent.next(comments);
      });
    });
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id);

    this.router.navigateByUrl('/courses');
  }

  updateCourse(id: string) {
    this.router.navigate(['courses', id, 'edit']);
  }
}
