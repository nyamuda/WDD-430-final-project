import { Component, OnInit, Signal, computed } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CompanyInfoEditComponent } from './company-info-edit/company-info-edit.component';
import { AdminService } from '../../admin.service';
import { CompanyInfo } from './company-info.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  modalRef: MdbModalRef<CompanyInfoEditComponent>;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getCompanyInformation();
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
  }

  addInfo() {
    this.modalRef = this.modalService.open(CompanyInfoEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        editMode: false,
      },
    });
  }

  companyInfoList: Signal<CompanyInfo[]> = computed(() =>
    this.adminService.companyInfoList()
  );
}
