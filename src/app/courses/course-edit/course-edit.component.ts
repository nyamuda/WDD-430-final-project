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
import {
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  courseFormGroup!: FormGroup;
  imagePreview;
  subscription: Subscription;
  editMode = false;
  courseToEdit: Course = new Course();
  //control for image upload
  fileUploadControl = new FormControl<File[]>(null, [
    FileUploadValidators.filesLimit(1),
    FileUploadValidators.accept(['image/*']),
  ]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.subscription = this.fileUploadControl.valueChanges.subscribe(
      (values: Array<File>) => this.readImage(values[0])
    );
    this.courseFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required],
      price: ['', Validators.required],
      //image upload control
      file: this.fileUploadControl,
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
            this.imagePreview = course.imageUrl;

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

      //checking if the image file exists
      let imageFile =
        this.fileUploadControl.value.length > 0
          ? this.fileUploadControl.value[0]
          : null;

      // does the image file exists
      let doesFileExists: boolean = !!imageFile;

      // if in edit mode
      if (this.editMode) {
        //if the course image has been updated
        this.courseService.updateCourse(
          this.courseToEdit['_id'],
          newCourse,
          imageFile,
          doesFileExists
        );
      }
      // else if in new document mode
      else {
        this.courseService.addCourse(newCourse, imageFile);
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

  isInvalid(): boolean {
    return this.fileUploadControl.invalid;
  }

  //Preview the new uploaded image
  readImage(file: File) {
    //Make sure its the right file(an image) and it exists

    if (
      this.fileUploadControl.valid &&
      this.fileUploadControl.value.length > 0
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
    //else preview the original image
    else {
      this.imagePreview = this.courseToEdit.imageUrl;
    }
  }
}
