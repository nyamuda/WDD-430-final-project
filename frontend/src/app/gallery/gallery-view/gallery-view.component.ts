import { Component, OnInit, Signal, computed } from '@angular/core';
import { GalleryItem, Gallery, ImageItem, VideoItem } from 'ng-gallery';
import { GalleryService } from '../gallery.service';
import { SchoolGalleryItem } from '../schoolGalleryItem.model';
import { MetaData } from '../../app.meta';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent implements OnInit {
  maxSize = 10;
  numPlaceholderImages = [0, 1, 2, 3, 4, 5];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {}

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
