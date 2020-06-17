import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ms-strings-input',
  templateUrl: './strings-input.component.html',
  styleUrls: ['./strings-input.component.scss']
})
export class StringsInputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() strings: string[];
  newString: string;

  constructor() { }

  ngOnInit() {
  }

  trackByIndex(index: number): any {
    return index;
  }

  addString() {
    if (!!this.newString) {
      this.strings.push(this.newString);
    }
    this.newString = null;
  }

  deleteString(i: number) {
    this.strings.splice(i, 1);
  }
}
