import { Component, Signal, computed } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { FileService } from 'src/app/files/file.service';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss'],
})
export class GalleryAddComponent {
  constructor(
    private galleryService: GalleryService,
    private fileService: FileService
  ) {}

  addImage() {
    this.galleryService.uploadGalleryItem();
  }

  isUploadingItem: Signal<boolean> = computed(() =>
    this.galleryService.isUploadingItemSignal()
  );

  isFileInvalid: Signal<boolean> = computed(() =>
    this.fileService.isFileInvalid()
  );
}
