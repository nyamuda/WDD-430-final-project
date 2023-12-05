import { Component, Input, Signal, computed } from '@angular/core';
import { Testimonial } from 'src/app/testimonials/testimonial.model';
import { TestimonialService } from 'src/app/testimonials/testimonial.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-homepage-testimonial-item',
  templateUrl: './homepage-testimonial-item.component.html',
  styleUrls: ['./homepage-testimonial-item.component.scss'],
})
export class HomepageTestimonialItemComponent {
  @Input() testimonials: Testimonial[];

  constructor(private testimonialService: TestimonialService, private userService:UsersService) {}

  placeholders = () => this.testimonialService.placeholders;

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );

  //placeholder image in case the reviewer
  //does not have a profile picture
  placeholderImageUrl = (testimonial: Testimonial) => {
    return this.userService.imagePlaceholderUrl(testimonial.userId.name);
  };
}
