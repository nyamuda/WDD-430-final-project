import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '../app.service';
import { UsersService } from '../users/users.service';
import { FAQ } from './faq.model';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  closeModal = new BehaviorSubject<boolean>(false);
  //show the loader or not
  isProcessingRequest: WritableSignal<boolean> = signal(false);
  //list of all the questions
  faqList: WritableSignal<FAQ[]> = signal(new Array<FAQ>());

  faqSubject = new BehaviorSubject<FAQ[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService,
    private userService: UsersService
  ) {}

  //get question by id
  getQuestionById(id: string): Observable<FAQ> {
    const url = `${this.appService.apiUrl}/faq/${id}`;
    return this.http.get<FAQ>(url);
  }

  //get all the questions
  getAllQuestions(): void {
    const url = `${this.appService.apiUrl}/faq/`;

    this.http.get<FAQ[]>(url).subscribe((questions: FAQ[]) => {
      this.faqList.set(questions);
      this.faqSubject.next(questions);
    });
  }

  //CREATE
  addQuestion(newQuestion: FAQ) {
    if (!!newQuestion) {
      //show loader
      this.isProcessingRequest.set(true);

      const url = `${this.appService.apiUrl}/faq`;
      const headers = this.headers();
      let questionDto = {
        question: newQuestion.question,
        answer: newQuestion.answer,
      };

      this.http.post(url, questionDto, { headers }).subscribe(
        (response) => {
          //stop loader
          this.isProcessingRequest.set(false);
          //close the modal
          this.closeModal.next(true);
          this.getAllQuestions();
          this.appService.showSuccessToast(
            'The question has been successfully added.',
            'Success!'
          );
        },
        (error) => {
          //stop loader
          this.isProcessingRequest.set(false);
          this.appService.showFailureToast(
            'Please review your data and try again.',
            'Failed to add question'
          );
        }
      );
    }
  }

  //UPDATE
  updateQuestion(id: string, newQuestion: FAQ) {
    if (!!newQuestion) {
      //show loader
      this.isProcessingRequest.set(true);

      const url = `${this.appService.apiUrl}/faq/${id}`;
      const headers = this.headers();
      let questionDto = {
        question: newQuestion.question,
        answer: newQuestion.answer,
      };

      this.http.put(url, questionDto, { headers }).subscribe(
        (response) => {
          //stop loader
          this.isProcessingRequest.set(false);
          //close the modal
          this.closeModal.next(true);
          this.getAllQuestions();
          this.appService.showSuccessToast(
            'The question has been successfully updated.',
            'Success!'
          );
        },
        (error) => {
          //stop loader
          this.isProcessingRequest.set(false);
          this.appService.showFailureToast(
            'Please review your data and try again.',
            'Failed to update question'
          );
        }
      );
    }
  }

  //DELETE
  deleteQuestion(id: string) {
    const url = `${this.appService.apiUrl}/faq/${id}`;
    let headers = this.headers();

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        this.getAllQuestions();
        this.appService.showSuccessToast(
          'The question has been deleted.',
          'Success!'
        );
      },
      (error) => {
        this.appService.showFailureToast(
          'There was an error during the deletion process.',
          'Deletion failed'
        );
      }
    );
  }

  headers(): HttpHeaders {
    let token = this.userService.getJwtToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
