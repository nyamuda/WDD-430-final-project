import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  course: Course = new Course();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let currentId = params['id'];

      this.courseService
        .getCourseById(currentId)
        .subscribe((course: Course) => {
          this.course = course;
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
