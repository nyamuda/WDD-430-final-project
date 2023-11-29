import { Component, Input, Signal, computed } from '@angular/core';
import { Testimonial } from '../testimonial.model';
import { User } from 'src/app/users/user.model';
import { UsersComponent } from 'src/app/users/users.component';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.scss'],
})
export class TestimonialItemComponent {
  @Input() testimonials: Testimonial[];

  constructor(private userService: UsersService) {}

  //current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //Check if the current logged in user
  //is the author or associated with the testimonial
  isCurrentUserTestimonialAuthor(id: string): boolean {
    if (id === this.currentUser()['_id']) {
      return true;
    }
    //if its the admin
    else if (this.currentUser().isAdmin) {
      return true;
    } else {
      return false;
    }
  }
}
