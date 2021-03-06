import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormAnswerComponent } from './form-answer/form-answer.component';
import { FormQuestionComponent } from './form-question/form-question.component';

@Injectable()
export class UtilsService {
  confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
  answerDialogRef: MdDialogRef<FormAnswerComponent>;
  questionDialogRef: MdDialogRef<FormQuestionComponent>;

  constructor(private dialog: MdDialog) { }

  confirm(message: string, btnOkText: string = 'YES', btnCancelText: string = 'NO'): Observable<Boolean> {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      data: {
        message: message,
        btnOkText: btnOkText,
        btnCancelText: btnCancelText
      }
    });
    return this.confirmDialogRef.afterClosed().map(result => {
      this.confirmDialogRef = null;
      return result;
    });
  }

  openAnswerDialog(data: any): Observable<any> {
    this.answerDialogRef = this.dialog.open(FormAnswerComponent, {
      panelClass: 'form-answer',
      disableClose: false,
      data: data
    });
    return this.answerDialogRef.afterClosed().map(result => {
      this.answerDialogRef = null;
      return result;
    });
  }

  openQuestionDialog(data: any): Observable<any> {
    this.questionDialogRef = this.dialog.open(FormQuestionComponent, {
      panelClass: 'form-question',
      disableClose: false,
      data: data
    });
    return this.questionDialogRef.afterClosed().map(result => {
      this.questionDialogRef = null;
      return result;
    });
  }
}
