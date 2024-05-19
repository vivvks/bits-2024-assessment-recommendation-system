// search.component.ts
import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from '../data.service';
//import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]> | undefined;

  // ngOnInit() {
  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value || '')),
  //   );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // searchText: string = '';
  // searchResults: any[] = [];
  // showResults: boolean = false;
  // selectedItem: any;

  // constructor(private dataService: DataService) { }

  // ngOnInit(): void {
  // }

  // search() {
  //   this.showResults = true;
  //   this.searchResults = this.dataService.search(this.searchText);
  // }

  // selectItem(item: any) {
  //   this.selectedItem = item;
  // }
  searchText: string = '';
  searchQuestionText: string = '';

  searchResults: any[] = [];
  searchQuestionResults: any[] = [];

  showResults: boolean = false;
  showQuestionResults: boolean = false;

  selectedItem: any;
  selectedItemQuestion: any;

    //questionnaireData: any[];




  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

//     loadQuestionnaireData() {
//       this.questionnaireService.getQuestionnaireData().subscribe(
//         (data) => {
//           this.questionnaireData = data;
//         },
//         (error) => {
//           console.error('Error fetching questionnaire data:', error);
//         }
//       );
//     }


  search() {
    this.showResults = true;
    this.searchResults = this.dataService.search(this.searchText);
  }

  searchQuestion() {
    this.showQuestionResults = true;
    this.searchQuestionResults = this.dataService.search(this.searchQuestionText);
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }
  selectItemQuestion(item: any) {
    this.selectedItemQuestion = item;
  }
}
