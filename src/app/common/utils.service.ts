import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdDialog } from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormAnswerComponent } from './form-answer/form-answer.component';

@Injectable()
export class UtilsService {
	private confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;
	private answerDialogRef: MdDialogRef<FormAnswerComponent>;

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
      return result
    })
  }

  openAnswerDialog(answer: any): Observable<any> {
    this.answerDialogRef = this.dialog.open(FormAnswerComponent, {
      panelClass: 'form-answer',
      disableClose: false,
      data: answer
    });
    return this.answerDialogRef.afterClosed().map(result => {
      this.answerDialogRef = null;
      return result
    })
  }
}
