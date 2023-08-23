import { Component, Signal, computed } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-account-details',
  templateUrl: './users-account-details.component.html',
  styleUrls: ['./users-account-details.component.scss'],
})
export class UsersAccountDetailsComponent {
  constructor(private userService: UsersService) {}

  user: Signal<User> = computed(() => this.userService.user());

  imageUrl: Signal<string> = computed(() =>
    this.userService.imagePlaceholderUrl(this.user().name)
  );
}
