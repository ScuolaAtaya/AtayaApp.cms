import { Injectable } from '@angular/core';

const MENUITEMS = [{
    type: 'edit',
    text: 'Edit'
}, {
    type: 'delete',
    text: 'Delete'
}];

@Injectable()
export class WorkListMenuItems {
  getAll(): any[] { // TODO Translate all texts
    return MENUITEMS;
  }
}