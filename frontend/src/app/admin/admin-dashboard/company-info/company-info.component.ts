import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompanyInfoEditComponent } from './company-info-edit/company-info-edit.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent {
  modalRef: MdbModalRef<CompanyInfoEditComponent>;

  constructor(private modalService: MdbModalService) {}

  editInfo(id: string) {
    this.modalRef = this.modalService.open(CompanyInfoEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        title: 'Please confirm deletion',
        id,
        editMode: true,
      },
    });
  }
}
