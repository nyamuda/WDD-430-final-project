import { Component, OnInit, Signal, computed } from '@angular/core';
import { Testimonial } from '../testimonial.model';
import { TestimonialService } from '../testimonial.service';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.scss'],
})
export class TestimonialListComponent implements OnInit {
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
    this.testimonialService.testimonialListSignal()
  );

  isFetchingTestimonials: Signal<boolean> = computed(() =>
    this.testimonialService.isFetchingTestimonials()
  );
}
