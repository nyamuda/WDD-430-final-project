import { Component, HostListener } from '@angular/core';
import { NgxAnimatedCounterParams } from '@bugsplat/ngx-animated-counter/lib/ngx-animated-counter-params';

@Component({
  selector: 'app-homepage-statistics',
  templateUrl: './homepage-statistics.component.html',
  styleUrls: ['./homepage-statistics.component.scss'],
})
export class HomepageStatisticsComponent {
  //Parameters for animating the numbers
  params: NgxAnimatedCounterParams[] = [
    {
      start: 0,
      end: 1000,
      interval: 50,
      increment: 20,
    },
    {
      start: 0,
      end: 600,
      interval: 50,
      increment: 10,
    },
    {
      start: 0,
      end: 500,
      interval: 50,
      increment: 10,
    },
    {
      start: 0,
      end: 4,
      interval: 500,
      increment: 1,
    },
  ];

  //is the statistics part of the  homepage component active
  isPartActive: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Calculate the scroll position
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    // Set the isPartActive flag based on the scroll position
    this.isPartActive = scrollPosition > 300; // Replace 300 with the desired scroll position for activation
  }
}
