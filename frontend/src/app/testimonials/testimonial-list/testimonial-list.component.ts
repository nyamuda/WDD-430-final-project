import { Component, OnInit, Signal, computed } from '@angular/core';
import { Testimonial } from '../testimonial.model';
import { TestimonialService } from '../testimonial.service';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.scss'],
})
export class TestimonialListComponent implements OnInit {
  placeholders = new Array<number>(3);

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {}

  testimonials: Signal<Testimonial[]> = computed(() =>
    this.testimonialService.testimonialListSignal()
  );

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );
}
