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

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.getTestimonials();
  }

  //The functions creates sub arrays consisting of three testimonials
  createSubArraysOfThree(items: Testimonial[]): Testimonial[][] {
    const result: Testimonial[][] = [];
    // Loop through the array in groups of three
    for (let i = 0; i < items.length; i += 3) {
      // Slice the input array to get the next three items
      const subarray = items.slice(i, i + 3);

      // Push the subarray into the result array
      result.push(subarray);
    }

    return result;
  }

  placeholders = () => this.testimonialService.placeholders;

  testimonials: Signal<Testimonial[]> = computed(() => {
    let items = this.testimonialService.testimonialListSignal();
    if (items.length > 0) {
      let subArray = items.slice(0, 10);
      this.groupsOfItems = this.createSubArraysOfThree(subArray);

      return subArray;
    }
    return items;
  });

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );
}
