import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CompanyInfo } from './company-info.model';
import { UsersService } from '../../../users/users.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompanyInfoEditComponent } from './company-info-edit/company-info-edit.component';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  //show the loader or not
  isProcessingRequest: WritableSignal<boolean> = signal(false);
  //close the modal or not
  closeModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //list of all the company info
  companyInfoList: WritableSignal<CompanyInfo[]> = signal(
    new Array<CompanyInfo>()
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService,
    private userService: UsersService
  ) {}

  //get the company information by id
  getCompanyInfoById(id: string): Observable<CompanyInfo> {
    const url = `${this.appService.apiUrl}/company-info/${id}`;
    return this.http.get<CompanyInfo>(url);
  }

  //get all the company information
  getCompanyInformation(): void {
    const url = `${this.appService.apiUrl}/company-info/`;

    this.http.get<CompanyInfo[]>(url).subscribe((info: CompanyInfo[]) => {
      this.companyInfoList.set(info);
    });
  }

  //CREATE
  addInfo(newInfo: CompanyInfo) {
    if (!!newInfo) {
      //show loader
      this.isProcessingRequest.set(true);

      const url = `${this.appService.apiUrl}/company-info`;
      const headers = this.headers();
      let infoDto = {
        title: newInfo.title,
        value: newInfo.value,
      };

      this.http.post(url, infoDto, { headers }).subscribe(
        (response) => {
          //stop loader
          this.isProcessingRequest.set(false);
          //close the modal
          this.closeModal.next(true);
          this.getCompanyInformation();
          this.appService.showSuccessToast(
            'The information has been successfully added.',
            'Success!'
          );
        },
        (error) => {
          //stop loader
          this.isProcessingRequest.set(false);
          this.appService.showFailureToast(
            'Please review your data and try again.',
            'Failed to add information'
          );
        }
      );
    }
  }

  //UPDATE
  updateInfo(id: string, newInfo: CompanyInfo) {
    if (!!newInfo) {
      //show loader
      this.isProcessingRequest.set(true);

      const url = `${this.appService.apiUrl}/company-info/${id}`;
      const headers = this.headers();
      let infoDto = {
        title: newInfo.title,
        value: newInfo.value,
      };

      this.http.put(url, infoDto, { headers }).subscribe(
        (response) => {
          //stop loader
          this.isProcessingRequest.set(false);
          //close the modal
          this.closeModal.next(true);
          this.getCompanyInformation();
          this.appService.showSuccessToast(
            'The information has been successfully updated.',
            'Success!'
          );
        },
        (error) => {
          //stop loader
          this.isProcessingRequest.set(false);
          this.appService.showFailureToast(
            'Please review your data and try again.',
            'Failed to update information'
          );
        }
      );
    }
  }

  //DELETE
  deleteInfo(id: string) {
    //show loader
    this.isProcessingRequest.set(true);

    //then delete the course information
    const url = `${this.appService.apiUrl}/company-info/${id}`;
    let headers = this.headers();

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        //stop loader
        this.isProcessingRequest.set(false);
        //close the modal
        this.closeModal.next(true);
        this.getCompanyInformation();
        this.appService.showSuccessToast(
          'The information has been deleted.',
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
