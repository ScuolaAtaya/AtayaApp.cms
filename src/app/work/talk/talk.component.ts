import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormTalkComponent } from './form-talk/form-talk.component'
import { TalkService } from './talk.service';
import { Talk } from './talk';

@Component({
	selector: 'ms-talk',
	templateUrl: './talk.component.html',
	styleUrls: ['./talk.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class TalkComponent implements OnInit {

	talkList: Talk[];
	numbers: any[];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	simpleOptions: SortablejsOptions = {
		animation: 300
	};

	constructor(private talkService: TalkService, private pageTitleService: PageTitleService) { }

	ngOnInit() {

		this.pageTitleService.setTitle("Scriviamo");

		this.talkService.getAll().subscribe(
			res => this.talkList = res,
			err => console.log('Error occured : ' + err)
		);
	
	}

}
