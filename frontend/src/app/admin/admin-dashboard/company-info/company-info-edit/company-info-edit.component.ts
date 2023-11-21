import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-company-info-edit',
  templateUrl: './company-info-edit.component.html',
  styleUrls: ['./company-info-edit.component.scss'],
})
export class CompanyInfoEditComponent implements OnInit {
  formGroup: FormGroup;
  editMode: boolean = false;
  id: string;

  constructor(
    public modalRef: MdbModalRef<CompanyInfoEditComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });
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
