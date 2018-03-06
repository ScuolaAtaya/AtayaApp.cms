import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormUnderstandComponent } from './form-understand/form-understand.component'
import { UnderstandService } from './understand.service';
import { Understand } from './understand';

@Component({
	selector: 'ms-understand',
	templateUrl: './understand.component.html',
	styleUrls: ['./understand.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class UnderstandComponent implements OnInit {

	understandList: Understand[];
	numbers: any[];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	simpleOptions: SortablejsOptions = {
		animation: 300
	};

	constructor(private understandService: UnderstandService, private pageTitleService: PageTitleService) { }

	ngOnInit() {

		this.pageTitleService.setTitle("Scriviamo");

		this.understandService.getAll().subscribe(
			res => this.understandList = res,
			err => console.log('Error occured : ' + err)
		  );
	
	}

}
