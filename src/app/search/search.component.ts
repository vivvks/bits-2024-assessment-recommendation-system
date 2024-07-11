// search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../data.service';
import { QuestionnaireService } from '../service/questionnaire.service';
import { MatCardModule } from '@angular/material/card';

//import { QuestionnaireService } from './questionnaire.service';
export interface Questionnaire {
  category: string;
  question: string;
  id: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl<string | Questionnaire>('');
  options: Questionnaire[] = [];
  searchQuestionResults: Questionnaire[] = [];
  recommendedQuestionResults: Questionnaire[] = [];
  filteredOptions: Observable<any> | undefined;
  tableData: [] = [];
  apiCalling:boolean=false;

  searchText: string = '';
  searchQuestionText: string = '';

  searchResults: any[] = [];

  showResults: boolean = false;
  showQuestionResults: boolean = false;

  selectedItem: any;
  selectedItemQuestion: any;

  dropdownItem: any[] = [];

  //questionnaireData: any[];

  constructor(private dataService: QuestionnaireService) {}

  ngOnInit() {

  }
  displayFn(ques: Questionnaire): string {
    return ques && ques.question ? ques.question : '';
  }

  setData(option: any) {
    console.log('optionoptionoption', option);

    // this.searchQuestionText = option.question; // Set the input field value
    this.dropdownItem.push(option.option.value); // Set options to single selected item
  }
  private _filter(ques: string): any[] {
    console.log('name', ques);

    const filterValue = ques.toLowerCase();

    return this.options.filter((option: any) =>
      option.question.toLowerCase().includes(filterValue)
    );
  }
  search() {
    this.showResults = true;
    // this.searchResults = this.dataService.search(this.searchText);
  }

  addToTable() {
    console.log(this.dropdownItem);

    this.searchQuestionResults = [...this.dropdownItem];
    this.showQuestionResults = true; // Show app-search-results
    // Clear search input text
    this.searchQuestionText = ''; // Assuming searchQuestionText is bound to [(ngModel)]

    // Optionally, clear dropdownItem array if needed
    // this.dropdownItem = [];
  }

  // http://127.0.0.1:5000/recommendItems/30083?train=false

  // ["30510", "30511", "30512", "30513", "30514", "30515", "30516", "30517", "30518", "30519", "30520", "30521", "30522", "30523", "30524"]
  //recommended item

  async fetchRecommendedItems(ids: string) {
    // let finalData=this.dataService.getQuestionsByIds(ids).subscribe({
    //   // next: (data) => {
    //   //   console.log('Recommended Items:', data);
    //   //   this.getRecommendedQuestions(data);

    //   //   // Handle response data as needed
    //   // },
    //   // error: (error) => {
    //   //   console.error('Error fetching recommended items:', error);
    //   //   // Handle error
    //   // },
    // });
    let finalData = await this.dataService.getQuestionsByIds(ids).toPromise();

    return finalData;
  }

  async getRecommendedQuestions(ids: any) {
    let finalQuestions = await this.dataService
      .getRecommendedQuestions(ids)
      .toPromise();

    return finalQuestions;
  }
  async searchQuestion() {
  this.apiCalling=true;
    this.options = []; // Reset options array before fetching new data
    if (this.searchQuestionResults.length >= 1) {
      const idsArray = this.searchQuestionResults.map((item) => item.id);
      // Step 2: Join IDs into a comma-separated string
      const idsString = idsArray.join(',');
      let commendedIds = await this.fetchRecommendedItems(idsString);
      let recommendedQues: any = await this.getRecommendedQuestions(
        commendedIds
      );
      //this.options =[{id:'3232',category:'eee',question:'fdfddf'}];

      this.options = recommendedQues.map((item: any, index: any) => ({
        id: item.id,
        category: item.category,
        question: item.question,
      }));
      this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => {
              const ques = typeof value === 'string' ? value : value?.question;
              return ques ? this._filter(ques as string) : this.options.slice();
            })
          );
          this.apiCalling=false
         this.recommendedQuestionResults = [...this.options];
         this.showResults = true;
    } else {
      this.dataService.getQuestionnaireData(this.searchQuestionText).subscribe({
        next: (data) => {
          // Assuming data is an array of Questionnaire objects
          this.options = data.map((item, index) => ({
            id: item.id,
            category: item.category,
            question: item.question,
          }));
          this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map((value) => {
                  const ques = typeof value === 'string' ? value : value?.question;
                  return ques ? this._filter(ques as string) : this.options.slice();
                })
              );

          console.log('this.optionsthis.optionsthis.options', this.options);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        this.apiCalling=false
          console.log('Complete');
        },
      });
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    console.log(item);
  }
  selectItemQuestion(item: any) {
    this.selectedItemQuestion = item;
    console.log(item);
  }
}
