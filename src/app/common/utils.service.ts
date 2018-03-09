import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MdDialog } from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class UtilsService {
	confirmDialogRef: MdDialogRef<ConfirmDialogComponent>;

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
}
