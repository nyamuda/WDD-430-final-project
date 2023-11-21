import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CompanyInfo } from '../company-info.model';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-company-info-edit',
  templateUrl: './company-info-edit.component.html',
  styleUrls: ['./company-info-edit.component.scss'],
})
export class CompanyInfoEditComponent implements OnInit {
  formGroup: FormGroup;
  editMode: boolean = false;
  id: string;
  companyInfo: CompanyInfo;

  constructor(
    public modalRef: MdbModalRef<CompanyInfoEditComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });

    //if we want to edit the company info
    if (this.editMode) {
      //get the company information by id
      this.adminService
        .getCompanyInfoById(this.id)
        .subscribe((info: CompanyInfo) => {
          this.companyInfo = info;

          //populate the form
          this.formGroup.patchValue({
            title: info.title,
            value: info.value,
          });
        });
    }
  }

  //close the modal
  //by passing value called 'confirmed'
  //to the component that called the modal
  confirmed() {
    if (this.formGroup.valid) {
      this.modalRef.close('confirmed');

      //if the info is being edited
      if (this.editMode) {
        alert('hello there');
      }
      //else new info is being added
      else {
        alert('no wa home');
      }
    }
  }
}
