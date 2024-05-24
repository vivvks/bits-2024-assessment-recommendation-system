// search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../data.service';
import { QuestionnaireService } from '../service/questionnaire.service';
//import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  searchText: string = '';
  searchQuestionText: string = '';

  searchResults: any[] = [];
  searchQuestionResults: any[] = [];

  showResults: boolean = false;
  showQuestionResults: boolean = false;

  selectedItem: any;
  selectedItemQuestion: any;

  //questionnaireData: any[];

  constructor(private dataService: QuestionnaireService) {}

  ngOnInit(): void {}

  search() {
    this.showResults = true;
    // this.searchResults = this.dataService.search(this.searchText);
  }

  searchQuestion() {
    let question: any;
    let options: any;
    let count: number = 0;

    this.dataService.getQuestionnaireData().subscribe({
      next: (data) => {
        let finalresult = data.filter((obj) =>
          obj.questnr_dtl.question
            .toLowerCase()
            .includes(this.searchQuestionText.toLowerCase())
        );

        for (let ques in finalresult) {
          this.searchQuestionResults.push({
            id: ques + 1,
            question: finalresult[ques].questnr_dtl.question,
            option: finalresult[ques].questnr_dtl.options.toString(),
          });
          // console.log(finalresult[ques]);
          count++;
        }
        if (count === finalresult.length) {
          this.showQuestionResults = true;
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }
  selectItemQuestion(item: any) {
    this.selectedItemQuestion = item;
  }
}

