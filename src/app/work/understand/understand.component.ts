import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormUnderstandComponent } from './form-understand/form-understand.component'
import { UnderstandService } from './understand.service';
import { Understand } from './understand';
import { ActivatedRoute } from '@angular/router';
import { SectionSolverService, Section } from '../section-solver.service';

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

	private section: Section;

	constructor(private understandService: UnderstandService,
		private pageTitleService: PageTitleService,
		private route: ActivatedRoute,
		private sectionService: SectionSolverService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
			this.pageTitleService.setTitle("Capiamo");

			this.understandService.getList(this.section.id)
				.subscribe(
					res => this.understandList = res as Understand[],
					err => console.log('Error occured : ' + err)
				);
		});

	}

}
