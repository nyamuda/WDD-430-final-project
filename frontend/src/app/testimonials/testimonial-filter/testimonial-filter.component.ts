import { Component } from '@angular/core';
import { TestimonialService } from '../testimonial.service';

@Component({
  selector: 'app-testimonial-filter',
  templateUrl: './testimonial-filter.component.html',
  styleUrls: ['./testimonial-filter.component.scss'],
})
export class TestimonialFilterComponent {
  sortingField = 'stars';

  constructor(private testimonialService: TestimonialService) {}

  //Sort the courses by a given field
  sortBy() {
    switch (this.sortingField) {
      //sort by title
      case 'title':
        break;
      //sort by reviews
      case 'reviews':
        break;
      //else sort by rating
      default:
        break;
    }
  }
}
