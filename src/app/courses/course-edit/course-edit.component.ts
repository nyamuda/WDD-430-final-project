import {
  Component,
  OnInit,
  Signal,
  computed,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { FileService } from 'src/app/files/file.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  courseFormGroup!: FormGroup;
  editMode = false;
  courseToEdit: Course = new Course();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    //course edit form group
    this.courseFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
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
              fullDescription: course.fullDescription,
              shortDescription: course.shortDescription,
              price: course.price,
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
      newCourse.fullDescription =
        this.courseFormGroup.controls['fullDescription'].value;
      newCourse.shortDescription =
        this.courseFormGroup.controls['shortDescription'].value;

      newCourse.price = this.courseFormGroup.controls['price'].value;
      newCourse.imageUrl = this.courseToEdit.imageUrl;

      // if in edit mode
      if (this.editMode) {
        this.courseService.updateCourse(this.courseToEdit['_id'], newCourse);
      }
      // else if in new document mode
      else {
        this.courseService.addCourse(newCourse);
      }
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('/courses');
  }

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //show a loader during an HTTP POST OR UPDATE request
  isProcessingRequest: Signal<boolean> = computed(() =>
    this.courseService.isProcessingRequest()
  );

  //only admins have the authority to edit or delete courses
  isAdmin(): boolean {
    return this.currentUser().isAdmin;
  }

  //checking if the image file is valid
  isFileInvalid: Signal<boolean> = computed(() =>
    this.fileService.isFileInvalid()
  );
}
