import { Question } from './../../work/question';
import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'ms-questions-input',
  templateUrl: './questions-input.component.html',
  styleUrls: ['./questions-input.component.scss']
})
export class QuestionsInputComponent implements OnInit {
  @Input() questions: Question[];
  @Input() isUnderstandQuestion: boolean;

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: Question): any {
    return index;
  }

  editQuestion(index: number, question: Question) {
    this.utils.openQuestionDialog({ question, isUnderstandQuestion: this.isUnderstandQuestion }).subscribe(res => {
      if (res !== undefined) {
        this.questions[index] = res;
      }
    });
  }

  addQuestion() {
    this.utils.openQuestionDialog({ question: undefined, isUnderstandQuestion: this.isUnderstandQuestion }).subscribe(res => {
      if (res !== undefined) {
        this.questions.push(res);
      }
    });
  }

  deleteQuestion(i: number) {
    this.questions.splice(i, 1);
  }
}
