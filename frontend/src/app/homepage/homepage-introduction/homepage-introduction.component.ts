import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-introduction',
  templateUrl: './homepage-introduction.component.html',
  styleUrls: ['./homepage-introduction.component.scss'],
})
export class HomepageIntroductionComponent implements OnInit {
  imageNumber: number = 1;

  ngOnInit(): void {
    this.imageNumber = this.generateRandomNumber();
  }

  //Generate random number between 1 and 4
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
