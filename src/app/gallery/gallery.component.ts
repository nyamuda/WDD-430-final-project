import { Component, OnInit } from '@angular/core';
import { GalleryItem, Gallery, ImageItem, VideoItem } from 'ng-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleryId = 'myLightbox';
  items: GalleryItem[];

  constructor(private gallery: Gallery) {}

  ngOnInit(): void {
    // Set items array
    this.items = [
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_01.jpg',
        thumb: '../../assets/images/students/img_01.jpg',
      }),
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_02.jpg',
        thumb: '../../assets/images/students/img_02.jpg',
      }),
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_03.jpg',
        thumb: '../../assets/images/students/img_03.jpg',
      }),
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_04.jpg',
        thumb: '../../assets/images/students/img_04.jpg',
      }),
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_05.jpg',
        thumb: '../../assets/images/students/img_05.jpg',
      }),
      new ImageItem({
        type: 'image',
        src: '../../assets/images/students/img_06.jpg',
        thumb: '../../assets/images/students/img_06.jpg',
      }),

      // ... more items
    ];

    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

  deleteImage(imageUrl: any) {
    alert(imageUrl);
  }
}
