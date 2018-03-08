import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormReadComponent } from './form-read/form-read.component'
import { ReadService } from './read.service';
import { Read } from './read';
import { ActivatedRoute } from '@angular/router';
import { Section, SectionSolverService } from '../section-solver.service';

@Component({
	selector: 'ms-read',
	templateUrl: './read.component.html',
	styleUrls: ['./read.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class ReadComponent implements OnInit {

	readList: Read[];
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

	constructor(private readService: ReadService,
		private pageTitleService: PageTitleService,
		private route: ActivatedRoute,
		private sectionService: SectionSolverService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
		});

		this.pageTitleService.setTitle("Leggiamo");

		this.readService.getList(this.section.id).subscribe(
			res => this.readList = res as Read[],
			err => console.log('Error occured : ' + err)
		);

	}

}
