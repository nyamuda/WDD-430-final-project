import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  title: string;
  message: string;
  action: string;

  constructor(public modalRef: MdbModalRef<ConfirmationModalComponent>) {}

  //close the modal
  //by passing value called 'confirmed'
  //to the component that called the modal
  confirmed() {
    this.modalRef.close('confirmed');
  }
}
