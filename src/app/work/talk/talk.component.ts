import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormTalkComponent } from './form-talk/form-talk.component'
import { TalkService } from './talk.service';
import { Talk } from './talk';
import { ActivatedRoute } from '@angular/router';
import { SectionSolverService, Section } from '../section-solver.service';

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

	section: Section;

	constructor(private talkService: TalkService,
		private pageTitleService: PageTitleService,
		private route: ActivatedRoute,
		private sectionService: SectionSolverService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
			this.pageTitleService.setTitle("Parliamo");

			this.talkService.getList(this.section.id)
				.subscribe(
					res => this.talkList = res as Talk[],
					err => console.log('Error occured : ' + err)
				);
		});

	}

}
