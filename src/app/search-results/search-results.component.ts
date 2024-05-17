import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit{
  // @Input() results: any;

  // displayedColumns: string[] = ['name']; // Add more columns as needed
  // selectedItem: any;

  // constructor() { }

  // ngOnInit(): void {
  // }

  // selectItem(item: any) {
  //   this.selectedItem = item;
  // }

  @Input() results: any;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
  
//https://material.angular.io/components/table/overview
  displayedColumns: string[] = ['id','name','category']; // Add more columns as needed

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: any) {
    console.log("items",item);
    
    this.selectedItem=item;

    console.log(this.selectedItem.name);
    
  }
}
