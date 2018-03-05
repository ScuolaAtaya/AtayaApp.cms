import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {SortablejsOptions} from "angular-sortablejs";
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { FormWriteComponent } from './form-write/form-write.component'

@Component({
  selector: 'ms-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
      "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class WriteComponent implements OnInit {

  list1: any[];
	list2: any[];
	numbers: any[];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	simpleOptions: SortablejsOptions = {
		animation: 300
	};

	constructor(private pageTitleService: PageTitleService) {}

  ngOnInit() {

    this.pageTitleService.setTitle("Scriviamo");

		this.list1 = [
		{
			image: 'assets/img/user-1.jpg',
			title: 'Exercise title 1'
		},
		{
			image: 'assets/img/user-2.jpg',
			title: 'Exercise title 2'
		},
		{
			image: 'assets/img/user-3.jpg',
			title: 'Exercise title 3'
		},
		{
			image: 'assets/img/user-4.jpg',
			title: 'Exercise title 4'
		},
		{
			image: 'assets/img/user-1.jpg',
			title: 'Exercise title 5'
		}];
  }

}
