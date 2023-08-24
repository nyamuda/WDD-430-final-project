import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery-delete',
  templateUrl: './gallery-delete.component.html',
  styleUrls: ['./gallery-delete.component.scss'],
})
export class GalleryDeleteComponent {
  constructor() {}

  deleteImage(imageUrl: any) {
    alert(imageUrl);
  }
}
