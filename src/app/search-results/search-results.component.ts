import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit, AfterViewInit {


  @Input() results: any[] | undefined;
  @Output() selectedItem: any;

  //https://material.angular.io/components/table/overview
  displayedColumns: string[] = [ 'question', 'option']; // Add more columns as needed


  dataSource: MatTableDataSource<any> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.results);
    // this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  // Inside SearchResultsComponent
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['results'] && !changes['results'].firstChange) {
      this.dataSource = new MatTableDataSource<any>(changes['results'].currentValue);
      this.dataSource.paginator = this.paginator;
    }
  }

  selectItem(item: any) {
    console.log("items", item);

    this.selectedItem = item;


  }
}
