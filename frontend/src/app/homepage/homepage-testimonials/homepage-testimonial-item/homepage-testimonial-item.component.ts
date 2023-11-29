import { Component, Input, Signal, computed } from '@angular/core';
import { Testimonial } from 'src/app/testimonials/testimonial.model';
import { TestimonialService } from 'src/app/testimonials/testimonial.service';

@Component({
  selector: 'app-homepage-testimonial-item',
  templateUrl: './homepage-testimonial-item.component.html',
  styleUrls: ['./homepage-testimonial-item.component.scss'],
})
export class HomepageTestimonialItemComponent {
  @Input() testimonials: Testimonial[];

  constructor(private testimonialService: TestimonialService) {}

  placeholders = () => this.testimonialService.placeholders;

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );
}
