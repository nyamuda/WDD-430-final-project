import { Component, Signal, computed, Input } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { SchoolGalleryItem } from '../schoolGalleryItem.model';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { MetaData } from '../../app.meta';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { GalleryItem, Gallery, ImageItem, VideoItem } from 'ng-gallery';

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
    private modalService: MdbModalService,
    private userService: UsersService
  ) {}

  //delete gallery item
  deleteImage(id: string, imageUrl: any) {
    this.galleryService.deleteGalleryItem(id, imageUrl);
  }

  //Open the modal before deleting an image
  //its centered
  openModal(id: string, imageUrl: string) {
    this.modalRef = this.modalService.open(ConfirmationModalComponent, {
      modalClass: 'modal-dialog-centered',

      //data to pass to the modal
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

  //information about the current logged in user
  currentUser: Signal<User> = computed(() => this.userService.user());

  //only admins have the authority to edit or gallery items
  isAdmin(): boolean {
    return this.currentUser().isAdmin;
  }

  //Generate gallery items
  items: Signal<GalleryItem[]> = computed(() => {
    let generatedItems: GalleryItem[] = [];

    this.galleryService
      .galleryListSignal()
      .forEach((item: SchoolGalleryItem) => {
        let imageItem = new ImageItem({
          /*"ImageItem" does not have an ID field, so instead, 
          we put the ID of the image in the "type" field. 
          We want the ID of the image to be able 
          to delete the image from the gallery.  
          */
          type: item['_id'],
          src: item.url,
          thumb: item.url,
        });
        generatedItems.push(imageItem);
      });

    return generatedItems;
  });
}
