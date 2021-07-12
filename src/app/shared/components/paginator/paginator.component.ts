import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  pageSizes = [5, 15, 50, 100];  
  private selectedPageSize = this.pageSizes[1];

  currentPage = 1;
  pageConfigs = [];

  @Input('total') total: number;

  @Output('pageChange') pageChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.initPageConfigs();
  }

  changePageSizeHandler(event) {
    this.selectedPageSize = event.target.value;
    this.initPageConfigs();

    this.currentPage = 1;
    const selectedPage = this.pageConfigs[this.currentPage - 1];
    console.log('selected page on size change', selectedPage);
    this.pageChange.emit({ ...selectedPage, size: this.selectedPageSize });
  }
    
  prevPageHandler() {
    if (this.pageConfigs.length && this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      const selectedPage = this.pageConfigs[this.currentPage - 1];
      console.log('selected prev page', selectedPage);
      this.pageChange.emit({ ...selectedPage, size: this.selectedPageSize });
      return;
    }
    console.warn('no prev page');
  }

  nextPageHandler() {
    if (this.pageConfigs.length && this.currentPage < this.pageConfigs.length) {
      this.currentPage = this.currentPage + 1;
      const selectedPage = this.pageConfigs[this.currentPage - 1];
      console.log('selected next page', selectedPage);
      this.pageChange.emit({ ...selectedPage, size: this.selectedPageSize });
      return;
    }
    console.warn('no next page');
  }
  
  toFirstPageHandler() {
    if (this.pageConfigs) {
      this.currentPage = 1;
      const selectedPage = this.pageConfigs[this.currentPage - 1];
      console.log('selected first page', selectedPage);
      this.pageChange.emit({ ...selectedPage, size: this.selectedPageSize });
      return;
    }
    console.warn('no first page');
  }

  toLastPageHandler() {
    if (this.pageConfigs) {
      this.currentPage = this.pageConfigs.length;
      const selectedPage = this.pageConfigs[this.currentPage - 1];
      console.log('selected last page', selectedPage);
      this.pageChange.emit({ ...selectedPage, size: this.selectedPageSize });
      return;
    }
    console.warn('no last page');
  }

  isSelected(value: number) {
    return value === this.selectedPageSize;
  }

  isNoPageAvailable() {
    return !this.pageConfigs || this.pageConfigs.length === 0;
  }

  isPrevPageAvailable() {
    return this.pageConfigs && this.currentPage > 1;
  }

  isNextPageAvailable() {
    return this.pageConfigs && this.currentPage < this.pageConfigs.length;
  }

  isOnFirstPage() {
    return this.pageConfigs && this.currentPage === 1;
  }

  isOnLastPage() {
    return this.pageConfigs && this.currentPage === this.pageConfigs.length;
  }

  get defaultPageSize() {
    return this.selectedPageSize;
  }

  private initPageConfigs() {
    this.pageConfigs = [];
    const n = this.total / this.selectedPageSize;
    for (let i = 0; i < n; i++) {
      this.pageConfigs.push({
        page: i + 1,
        start: i * this.selectedPageSize
      })
    }
  }

}
