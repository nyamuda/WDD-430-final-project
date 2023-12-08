import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../users/user.model';
import { ActivatedRoute } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  imageNumber = 1;

  ngOnInit(): void {
    this.imageNumber = this.generateRandomNumber();
  }
  //Generate random number between 1 and 4
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
