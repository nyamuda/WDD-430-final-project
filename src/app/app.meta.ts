//Meta Data For Pagination
export class MetaData {
  constructor(
    public totalItems: number,
    public currentPage: number,
    public pageSize: number
  ) {}

  startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  endItem(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  printPaginationInfo(itemName: string): string {
    return `  ${this.startItem()} to ${this.endItem()} of ${
      this.totalItems
    } <b>${itemName}</b>`;
  }
}
