import { Component, Input } from '@angular/core';
import { MetaData } from '../../review.model';

@Component({
  selector: 'app-review-pagination',
  templateUrl: './review-pagination.component.html',
  styleUrls: ['./review-pagination.component.scss'],
})
export class ReviewPaginationComponent {
  @Input('metaData') metaData: MetaData;
}
