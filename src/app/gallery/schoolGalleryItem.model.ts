import { MetaData } from '../app.meta';

// Gallery Item Model--> Image or Video
export class SchoolGalleryItem {
  constructor(public url: string, public type: string, public id: string) {}
}
export class GalleryMetaDto {
  constructor(public items: SchoolGalleryItem[], public meta: MetaData) {}
}
