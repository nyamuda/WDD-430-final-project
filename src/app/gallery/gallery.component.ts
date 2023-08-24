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
        src: 'https://images.unsplash.com/photo-1621905252472-943afaa20e20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1621905252472-943afaa20e20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),

      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1564541558234-ef406c118d0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1564541558234-ef406c118d0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1495490140452-5a226aef25d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1495490140452-5a226aef25d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJsYWNrJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      new ImageItem({
        type: 'image',
        src: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        thumb:
          'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      }),
      // ... more items
    ];

    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}
