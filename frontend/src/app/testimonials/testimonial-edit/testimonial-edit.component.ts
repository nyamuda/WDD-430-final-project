import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Testimonial } from '../testimonial.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialService } from '../testimonial.service';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-testimonial-edit',
  templateUrl: './testimonial-edit.component.html',
  styleUrls: ['./testimonial-edit.component.scss'],
})
export class TestimonialEditComponent implements OnInit {
  testimonialFormGroup!: FormGroup;
  editMode = false;
  testimonialToEdit: Testimonial = new Testimonial();
  testimonialId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private testimonialService: TestimonialService,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.testimonialFormGroup = this.formBuilder.group({
      content: ['', Validators.required],
      stars: [1],
      position: ['', Validators.required],
    });
    //Grab the testimonial ID
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      //if the id is not null
      //then it's editing mode
      if (!!id) {
        this.testimonialId = id;
        this.testimonialService
          .getTestimonialById(id)
          .subscribe((testimonial: Testimonial) => {
            //if the testimonial exists
            if (!!testimonial) {
              this.editMode = true;
              this.testimonialToEdit = testimonial;

              //populate the form
              this.testimonialFormGroup.patchValue({
                content: testimonial.content,
                stars: testimonial.stars,
                position: testimonial.position,
              });
            }
          });
      }
      //else it's add 'new testimonial' mode
      return;
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.testimonialFormGroup.valid) {
      let newTestimonial = new Testimonial();

      newTestimonial.content =
        this.testimonialFormGroup.controls['content'].value;
      newTestimonial.stars = this.testimonialFormGroup.controls['stars'].value;

      newTestimonial.position =
        this.testimonialFormGroup.controls['position'].value;



      //if in edit mode
      if (this.editMode) {
        this.testimonialService.updateTestimonial(
          this.testimonialId,
          newTestimonial
        );
      } //else if in new testimonial mode
      else {
        this.testimonialService.addTestimonial(newTestimonial);
       
      }
    }
  }

  //current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //placeholder image in case the reviewer
  //does not have a profile picture
  placeholderImageUrl: Signal<string> = computed(() =>
    this.userService.imagePlaceholderUrl(this.currentUser().name)
  );

  onCancel(event: Event) {
    event.preventDefault();
  }
}
