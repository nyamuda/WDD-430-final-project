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
  params: NgxAnimatedCounterParams[] = [];

  //is the statistics part of the  homepage component active
  isPartActive: boolean = false;
  companyInfoList: CompanyInfo[] = [];

  constructor(private companyInfoService: CompanyInfoService) {}

  ngOnInit(): void {
    //get the company information
    this.companyInfoService.getCompanyInformation();

    this.companyInfoService.companyInfoSubject.subscribe(
      (info: CompanyInfo[]) => {
        //animation parameters
        this.params = this.generateParametersForAnimation(info);

        //list of company information
        this.companyInfoList = info;
      }
    );

    console.log(this.params);
  }

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

  //Generated parameters for animating the numbers
  generateParametersForAnimation(
    companyInfo: CompanyInfo[]
  ): NgxAnimatedCounterParams[] {
    const newArray = [];
    companyInfo.forEach((originalItem) => {
      const endValue = originalItem.value;
      const intervalValue = this.getRandomInt(10, 50); // Random interval between 10 and 50
      const incrementValue = this.getRandomInt(5, 20); // Random increment between 1 and 10

      const animationParameters = {
        start: 0,
        end: endValue,
        interval: intervalValue,
        increment: incrementValue,
      };

      newArray.push(animationParameters);
    });
    return newArray;
  }

  // Helper function to generate a random integer between min and max (inclusive)
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
