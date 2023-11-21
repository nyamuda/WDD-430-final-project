import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CompanyInfo } from '../company-info.model';
import { CompanyInfoService } from '../company-info.service';

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
    private companyInfoService: CompanyInfoService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });
    //close the modal or not
    this.companyInfoService.closeModal.subscribe((closeModal: boolean) => {
      if (closeModal) {
        this.modalRef.close();
      }
    });

    //if we want to edit the company info
    if (this.editMode) {
      //get the company information by id
      this.companyInfoService
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

  //submit form
  submit() {
    if (this.formGroup.valid) {
      let title = this.formGroup.get('title').value;
      let value = this.formGroup.get('value').value;

      let companyInfo = new CompanyInfo();
      companyInfo.title = title;
      companyInfo.value = value;

      //if the info is being edited
      if (this.editMode) {
        this.companyInfoService.updateInfo(this.id, companyInfo);
      }
      //else new info is being added
      else {
        this.companyInfoService.addInfo(companyInfo);
      }
    }
  }

  //is processing a CRUD request or not
  isProcessingRequest: Signal<boolean> = computed(() =>
    this.companyInfoService.isProcessingRequest()
  );
}
