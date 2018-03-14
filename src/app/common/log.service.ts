import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class LogService {

  constructor(private snackBar: MdSnackBar, private translate: TranslateService) { }

  info(message: string)  {
    this.log(message, 'info')
  }

  warning(message: string)  {
    this.log(message, 'warning')
  }

  success(message: string)  {
    this.log(message, 'success')
  }

  error(message: string)  {
    this.log(message, 'error')
  }

  private log(message: string, type: string) {
    let extraClasses = []
    switch (type) {
      case 'success': {
        extraClasses = ['toast-dark', 'toast-success']
        break;
      }
      case 'info': {
        extraClasses =  ['toast-light', 'toast-assert']
        break;
      }
      case 'warning': {
        extraClasses = ['toast-light', 'toast-warning']
        break;
      }
      case 'error': {
        extraClasses = ['toast-dark', 'toast-error']
        break;
      }
      default: {
        break;
      }
    }
    this.translate.get('CLOSE').subscribe((translatedText: string) => {
      this.snackBar.open(message, translatedText.toUpperCase(), {
        duration: 3000,
        extraClasses: extraClasses
      })
    })
  }

  public serverError() {
    this.translate.get('server error').subscribe((translatedText: string) => {
      this.error(translatedText)
    })
  }
}
