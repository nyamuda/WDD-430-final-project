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
        //only the first 4 elements
        let firstFourItems = info.slice(0, 4);
        //animation parameters
        this.params = this.generateParametersForAnimation(firstFourItems);

        //list of company information

        this.companyInfoList = firstFourItems;
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
      let intervalValue;
      let incrementValue;

      if (endValue > 1000) {
        intervalValue = this.getRandomInt(10, 50);
        incrementValue = this.getRandomInt(50, 100);
      } else if (endValue > 500) {
        intervalValue = this.getRandomInt(20, 50);
        incrementValue = this.getRandomInt(10, 20);
      } else if (endValue > 100) {
        intervalValue = this.getRandomInt(30, 100);
        incrementValue = this.getRandomInt(5, 20);
      } else if (endValue > 50) {
        intervalValue = this.getRandomInt(100, 200);
        incrementValue = this.getRandomInt(1, 10);
      } else {
        intervalValue = this.getRandomInt(150, 300);
        incrementValue = this.getRandomInt(1, 2);
      }

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
