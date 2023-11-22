import { Component, OnInit, Signal, computed } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompanyInfoEditComponent } from './company-info-edit/company-info-edit.component';

import { CompanyInfo } from './company-info.model';
import { CompanyInfoService } from './company-info.service';
import { ConfirmationModalComponent } from '../../../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  modalRef: MdbModalRef<CompanyInfoEditComponent>;
  confirmationModalRef: MdbModalRef<ConfirmationModalComponent>;

  constructor(
    private modalService: MdbModalService,
    private companyInfoService: CompanyInfoService
  ) {}

  ngOnInit(): void {
    this.companyInfoService.getCompanyInformation();
  }

  editInfo(id: string) {
    this.modalRef = this.modalService.open(CompanyInfoEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        id,
        editMode: true,
      },
    });
    this.companyInfoService.closeModal.next(false);
  }

  addInfo() {
    this.modalRef = this.modalService.open(CompanyInfoEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        editMode: false,
      },
    });
    this.companyInfoService.closeModal.next(false);
  }

  companyInfoList: Signal<CompanyInfo[]> = computed(() =>
    this.companyInfoService.companyInfoList()
  );

  //Delete company information
  deleteInfo(id: string) {
    this.confirmationModalRef = this.modalService.open(
      ConfirmationModalComponent,
      {
        modalClass: 'modal-dialog-centered',

        //data to pass to the modal
        data: {
          title: 'Please confirm deletion',
          message: 'Do you wish to proceed with deleting this information?',
          action: 'Delete',
        },
      }
    );

    //if the deletion has been confirmed
    this.confirmationModalRef.onClose.subscribe((message) => {
      if (message === 'confirmed') {
        this.companyInfoService.deleteInfo(id);
      }
    });
  }
}
