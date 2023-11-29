import { Component, OnInit, Signal, computed } from '@angular/core';
import { TestimonialService } from '../testimonial.service';
import { Router } from '@angular/router';
import { MetaData } from '../../app.meta';
import { Testimonial } from '../testimonial.model';

@Component({
  selector: 'app-testimonial-pagination',
  templateUrl: './testimonial-pagination.component.html',
  styleUrls: ['./testimonial-pagination.component.scss'],
})
export class TestimonialPaginationComponent implements OnInit {
  maxSize: number = 10;
  groupsOfItems: Testimonial[][] = [];

  constructor(
    private testimonialService: TestimonialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupsOfItems = this.createSubArraysOfThree();
  }

  //Reviews meta data for pagination
  metaData: Signal<MetaData> = computed(() =>
    this.testimonialService.metaDataSignal()
  );
  testimonials: Signal<Testimonial[]> = computed(() =>
    this.testimonialService.testimonialListSignal()
  );

  //Change reviews pagination number
  pageChanged(newPage) {
    //get testimonials for the new page
    this.testimonialService.getTestimonials(newPage);

    //scroll up to the top of the review list
    const element = document.getElementById('testimonials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
}
