import { Answer } from './../../work/answer';
import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'ms-answers-input',
  templateUrl: './answers-input.component.html',
  styleUrls: ['./answers-input.component.scss']
})
export class AnswersInputComponent implements OnInit {
  @Input() answers: Answer[];

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: Answer): any {
    return index;
  }

  editAnswer(index: number, answer: Answer) {
    this.utils.openAnswerDialog(answer).subscribe(res => {
      if (res !== undefined) {
        this.answers[index] = res;
      }
    })
  }

  addAnswer() {
    this.utils.openAnswerDialog(undefined).subscribe(res => {
      if (res !== undefined) {
        this.answers.push(res);
      }
    });
  }

  deleteAnswer(i: number) {
    this.answers.splice(i, 1);
  }
}
