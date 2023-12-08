import { Component, OnInit, Signal, computed, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  imageNumber = 1;

  ngOnInit(): void {
    this.imageNumber = this.generateRandomNumber();
  }

  //Generate random number between 1 and 4
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
