import { Component, Signal, computed } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { SchoolGalleryItem } from '../schoolGalleryItem.model';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { MetaData } from '../../app.meta';

@Component({
  selector: 'app-gallery-delete',
  templateUrl: './gallery-delete.component.html',
  styleUrls: ['./gallery-delete.component.scss'],
})
export class GalleryDeleteComponent {
  //the modal
  modalRef: MdbModalRef<ConfirmationModalComponent>;
  maxSize = 10;

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
  //Gallery meta data for pagination
  metaData: Signal<MetaData> = computed(() =>
    this.galleryService.metaDataSignal()
  );

  //Change gallery pagination number
  pageChanged(newPage) {
    //change the page number
    this.galleryService.pageNumberSignal.set(newPage);
    this.galleryService.getGalleryItems();
    //scroll up to the top of the gallery list
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
