import { Component, Signal, computed } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { SchoolGalleryItem } from '../schoolGalleryItem.model';

@Component({
  selector: 'app-gallery-delete',
  templateUrl: './gallery-delete.component.html',
  styleUrls: ['./gallery-delete.component.scss'],
})
export class GalleryDeleteComponent {
  constructor(private galleryService: GalleryService) {}

  //delete gallery item
  deleteImage(id: string, imageUrl: any) {
    this.galleryService.deleteGalleryItem(id, imageUrl);
  }

  //Generate gallery items
  items: Signal<SchoolGalleryItem[]> = computed(() =>
    this.galleryService.galleryListSignal()
  );
}
