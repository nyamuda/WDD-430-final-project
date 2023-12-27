import { Component, Input } from '@angular/core';
import { StarsDistribution } from './stars-distribution.model';

@Component({
  selector: 'app-stars-distribution',
  templateUrl: './stars-distribution.component.html',
  styleUrls: ['./stars-distribution.component.scss'],
})
export class StarsDistributionComponent {
  items = new Array<number>(5);
  @Input() distribution = new StarsDistribution();
}
