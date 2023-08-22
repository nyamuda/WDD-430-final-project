import { Component, OnInit, Signal, computed } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-users-account-edit',
  templateUrl: './users-account-edit.component.html',
  styleUrls: ['./users-account-edit.component.scss'],
})
export class UsersAccountEditComponent implements OnInit {
  userFormGroup: FormGroup;
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

    //file the form with the user details
    this.userFormGroup.patchValue({
      name: this.user().name,
      email: this.user().email,
    });
  }

  user: Signal<User> = computed(() => this.userService.user());

  //show a loader during an HTTP POST OR UPDATE request
  isProcessingRequest: Signal<boolean> = computed(() =>
    this.userService.isProcessingRequest()
  );

  submitForm(event: Event) {
    event.preventDefault();
    if (this.userFormGroup.valid) {
      let userId:string = this.user()['_id'];
      let newUser = new User();

      newUser.name = this.userFormGroup.controls['name'].value;
      newUser.email = this.userFormGroup.controls['email'].value;
      this.userService.updateUser(userId,newUser);
    }
  }
}
