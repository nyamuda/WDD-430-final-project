import { Component, Input } from '@angular/core';
import { Testimonial } from 'src/app/testimonials/testimonial.model';

@Component({
  selector: 'app-homepage-testimonial-item',
  templateUrl: './homepage-testimonial-item.component.html',
  styleUrls: ['./homepage-testimonial-item.component.scss']
})
export class HomepageTestimonialItemComponent {
  @Input() testimonials: Testimonial[];
}
