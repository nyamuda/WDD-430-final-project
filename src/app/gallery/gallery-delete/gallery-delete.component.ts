import { Component, Signal, computed } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { SchoolGalleryItem } from '../schoolGalleryItem.model';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-gallery-delete',
  templateUrl: './gallery-delete.component.html',
  styleUrls: ['./gallery-delete.component.scss'],
})
export class GalleryDeleteComponent {
  //the modal
  modalRef: MdbModalRef<ConfirmationModalComponent>;

  constructor(
    private galleryService: GalleryService,
    private modalService: MdbModalService
  ) {}

  //delete gallery item
  deleteImage(id: string, imageUrl: any) {
    this.galleryService.deleteGalleryItem(id, imageUrl);
  }

  //Generate gallery items
  items: Signal<SchoolGalleryItem[]> = computed(() =>
    this.galleryService.galleryListSignal()
  );

  //Open the modal before deleting an image
  //its centered
  openModal(id: string, imageUrl: string) {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Please confirm deletion',
        message: 'Do you wish to proceed with deleting this image?',
        action: 'Delete',
      },
    });

    //if the deletion has been confirmed
    this.modalRef.onClose.subscribe((message) => {
      if (message === 'confirmed') {
        this.deleteImage(id, imageUrl);
      }
    });
  }
}
