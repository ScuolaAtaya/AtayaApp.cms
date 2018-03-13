import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class LogServiceService {

  constructor(private snackBar: MdSnackBar) { }

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

    this.snackBar.open(message, 'CLOSE', { // TODO Translate
      duration: 3000,
      extraClasses: extraClasses
    })
  }
}
