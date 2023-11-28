import { Component, OnInit, Signal, computed } from '@angular/core';
import { Testimonial } from 'src/app/testimonials/testimonial.model';
import { TestimonialService } from 'src/app/testimonials/testimonial.service';

@Component({
  selector: 'app-homepage-testimonials',
  templateUrl: './homepage-testimonials.component.html',
  styleUrls: ['./homepage-testimonials.component.scss'],
})
export class HomepageTestimonialsComponent implements OnInit {
  groupsOfItems: Testimonial[][] = [];
  placeholders = new Array<number>(3);

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.groupsOfItems = this.createSubArraysOfThree();
  }

  //The functions creates sub arrays consisting of three testimonials
  createSubArraysOfThree(): Testimonial[][] {
    const result: Testimonial[][] = [];
    // Loop through the array in groups of three
    for (let i = 0; i < this.testimonials().length; i += 3) {
      // Slice the input array to get the next three items
      const subarray = this.testimonials().slice(i, i + 3);

      // Push the subarray into the result array
      result.push(subarray);
    }

    return result;
  }

  testimonials: Signal<Testimonial[]> = computed(() =>
    this.testimonialService.testimonialListSignal().slice(6)
  );

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );
}
