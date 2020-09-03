import { Option } from './../../work/options';
import { Answer } from './../../work/answer';
import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'ms-answers-input',
  templateUrl: './answers-input.component.html',
  styleUrls: ['./answers-input.component.scss']
})
export class AnswersInputComponent implements OnInit {
  @Input() model: any[];
  @Input() isReadOption: boolean;

  constructor(public utils: UtilsService) { }

  ngOnInit() { }

  trackByIndex(index: number): any {
    return index;
  }

  editAnswer(index: number, model: any) {
    this.utils.openAnswerDialog({ model, isReadOption: this.isReadOption }).subscribe(res => {
      if (!!res) {
        this.model[index] = res;
      }
    });
  }

  addAnswer() {
    this.utils.openAnswerDialog({ model: undefined, isReadOption: this.isReadOption }).subscribe(res => {
      if (!!res) {
        this.model.push(res);
      }
    });
  }

  deleteAnswer(i: number) {
    this.model.splice(i, 1);
  }
}
