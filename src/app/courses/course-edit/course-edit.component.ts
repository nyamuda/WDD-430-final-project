import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent {
  courseFormGroup!: FormGroup;
  editMode = false;
  courseToEdit: Course = new Course();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.courseFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      //if the id is not null
      //then its editing mode
      if (!!id) {
        this.courseService.getCourseById(id).subscribe((course: Course) => {
          //if the course exists
          if (!!course) {
            this.editMode = true;
            this.courseToEdit = course;

            //populate the form
            this.courseFormGroup.patchValue({
              title: course.title,
              description: course.description,
              price: course.price,
              imageUrl: course.imageUrl,
            });
          }
        });
      }
      //else its add new course mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.courseFormGroup.valid) {
      let newCourse = new Course();

      newCourse.title = this.courseFormGroup.controls['title'].value;
      newCourse.description =
        this.courseFormGroup.controls['description'].value;
      newCourse.imageUrl = this.courseFormGroup.controls['imageUrl'].value;
      newCourse.price = this.courseFormGroup.controls['price'].value;

      //if in edit mode
      if (this.editMode) {
        this.courseService.updateCourse(this.courseToEdit['_id'], newCourse);
        this.router.navigateByUrl('/courses');
      }
      //else if in new document mode
      else {
        this.courseService.addCourse(newCourse);
        this.router.navigateByUrl('/courses');
      }
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/courses');
  }
}
