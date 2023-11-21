import { Component, OnInit, Signal, computed } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompanyInfoEditComponent } from './company-info-edit/company-info-edit.component';

import { CompanyInfo } from './company-info.model';
import { CompanyInfoService } from './company-info.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  modalRef: MdbModalRef<CompanyInfoEditComponent>;

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
}
