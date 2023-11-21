import {
  Component,
  HostListener,
  OnInit,
  Signal,
  computed,
} from '@angular/core';
import { NgxAnimatedCounterParams } from '@bugsplat/ngx-animated-counter/lib/ngx-animated-counter-params';
import { CompanyInfoService } from '../../admin/admin-dashboard/company-info/company-info.service';
import { CompanyInfo } from 'src/app/admin/admin-dashboard/company-info/company-info.model';

@Component({
  selector: 'app-homepage-statistics',
  templateUrl: './homepage-statistics.component.html',
  styleUrls: ['./homepage-statistics.component.scss'],
})
export class HomepageStatisticsComponent implements OnInit {
  //Parameters for animating the numbers
  params: NgxAnimatedCounterParams[] = [
    {
      start: 0,
      end: 200,
      interval: 50,
      increment: 5,
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

  constructor(private companyInfoService: CompanyInfoService) {}

  ngOnInit(): void {}

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

  //list of the company information
  companyInfoList: Signal<CompanyInfo[]> = computed(() =>
    this.companyInfoService.companyInfoList()
  );
}
