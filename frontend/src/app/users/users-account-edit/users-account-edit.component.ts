import { Component, OnInit, Signal, computed } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../files/file.service';

@Component({
  selector: 'app-users-account-edit',
  templateUrl: './users-account-edit.component.html',
  styleUrls: ['./users-account-edit.component.scss'],
})
export class UsersAccountEditComponent implements OnInit {
  userFormGroup: FormGroup;
  userId: string;
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];

      this.userFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });

      //file the form with the user details
      this.userService.getUser(this.userId).subscribe((user: User) => {
        this.userFormGroup.patchValue({
          name: user.name,
          email: user.email,
        });
      });
    });
  }

  user: Signal<User> = computed(() => this.userService.user());

  //show a loader during an HTTP POST OR UPDATE request
  isProcessingRequest: Signal<boolean> = computed(() =>
    this.userService.isProcessingRequest()
  );

  placeholderImageUrl: Signal<string> = computed(() =>
    this.userService.imagePlaceholderUrl(this.user().name)
  );
  //checking if the image file is valid
  isFileInvalid: Signal<boolean> = computed(() =>
    this.fileService.isFileInvalid()
  );

  submitForm(event: Event) {
    event.preventDefault();
    if (this.userFormGroup.valid) {
      let newUser = new User();

      newUser.name = this.userFormGroup.controls['name'].value;
      newUser.email = this.userFormGroup.controls['email'].value;
      newUser.imageUrl = this.user().imageUrl;
      this.userService.updateUser(this.userId, newUser);
    }
  }
}
