import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ms-strings-input',
  templateUrl: './strings-input.component.html',
  styleUrls: ['./strings-input.component.scss']
})
export class StringsInputComponent implements OnInit {

  @Input() strings: any;

  constructor() { }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  addString(string: string) {
    if (string) {
      this.strings.push(string);
    }
  }

  deleteString(i: number) {
    this.strings.splice(i, 1);
  }
}
