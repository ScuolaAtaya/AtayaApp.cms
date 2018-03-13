import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'ms-questions-input',
  templateUrl: './questions-input.component.html',
  styleUrls: ['./questions-input.component.scss']
})
export class QuestionsInputComponent implements OnInit {

  @Input() questions: any;

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  editQuestion(index: number, question: any) {
    this.utils.openQuestionDialog(question).subscribe(res => {
      if (res !== undefined) {
        this.questions[index] = res
      }
    })
  }

  addQuestion() {
    this.utils.openQuestionDialog(undefined).subscribe(res => {
      if (res !== undefined) {
        this.questions.push(res)
      }
    })
  }

  deleteQuestion(i: number) {
    this.questions.splice(i, 1);
  }

}