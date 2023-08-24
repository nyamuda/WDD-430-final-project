// Gallery Item Model--> Image or Video
export class SchoolGalleryItem {
  constructor(public url: string, public type: string, public id: string) {}
}

export class MetaData {
  constructor(
    public totalItems: number,
    public currentPage: number,
    public pageSize: number
  ) {}
}

export class GalleryMetaDto {
  constructor(public items: SchoolGalleryItem[], public meta: MetaData) {}
}
