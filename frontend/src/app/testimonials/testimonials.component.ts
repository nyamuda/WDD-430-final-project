import { Component, OnInit, Signal, computed } from '@angular/core';
import { Testimonial } from './testimonial.model';
import { TestimonialService } from './testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.getTestimonials();
  }

  topTestimonial: Signal<Testimonial> = computed(() =>
    this.testimonialService.topTestimonialSignal()
  );
}
