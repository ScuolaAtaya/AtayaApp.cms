import { Injectable } from '@angular/core';

const MENUITEMS = [{
    type: 'edit',
    key: 'EDIT'
}, {
    type: 'delete',
    key: 'DELETE'
}];

@Injectable()
export class WorkListMenuItems {
  getAll(): any[] {
    return MENUITEMS;
  }
}