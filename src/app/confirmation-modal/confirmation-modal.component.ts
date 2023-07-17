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

  //action confirmed
  confirmed() {
    this.modalRef.close('confirmed');
  }
}
