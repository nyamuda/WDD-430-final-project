import { Component, Input } from '@angular/core';
import { Testimonial } from '../testimonial.model';

@Component({
  selector: 'app-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.scss'],
})
export class TestimonialItemComponent {
  @Input() testimonials: Testimonial[];
}
