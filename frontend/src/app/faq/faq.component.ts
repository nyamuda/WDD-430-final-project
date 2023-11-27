import { Component, Signal, computed } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FaqEditComponent } from './faq-edit/faq-edit.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { FaqService } from './faq.service';
import { FAQ } from './faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent {
  modalRef: MdbModalRef<FaqEditComponent>;
  confirmationModalRef: MdbModalRef<ConfirmationModalComponent>;

  constructor(
    private modalService: MdbModalService,
    private faqService: FaqService
  ) {}

  ngOnInit(): void {
    this.faqService.getAllQuestions();
  }

  editItem(id: string) {
    this.modalRef = this.modalService.open(FaqEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        id,
        editMode: true,
      },
    });
    this.faqService.closeModal.next(false);
  }

  addItem() {
    this.modalRef = this.modalService.open(FaqEditComponent, {
      modalClass: 'modal-dialog-centered',
      //data to pass to the modal
      data: {
        editMode: false,
      },
    });
    this.faqService.closeModal.next(false);
  }

  faqList: Signal<FAQ[]> = computed(() => this.faqService.faqList());

  //Delete company information
  deleteItem(id: string) {
    this.confirmationModalRef = this.modalService.open(
      ConfirmationModalComponent,
      {
        modalClass: 'modal-dialog-centered',

        //data to pass to the modal
        data: {
          title: 'Please confirm deletion',
          message: 'Do you wish to proceed with deleting this question?',
          action: 'Delete',
        },
      }
    );

    //if the deletion has been confirmed
    this.confirmationModalRef.onClose.subscribe((message) => {
      if (message === 'confirmed') {
        this.faqService.deleteQuestion(id);
      }
    });
  }
}
