import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.scss'],
})
export class TestimonialItemComponent {
  @Input() testimonials: testimonial[];
}
type testimonial = {
  name: string;
  imageUrl: string;
  position: string;
  content: string;
};
