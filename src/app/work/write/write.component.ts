import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormWriteComponent } from './form-write/form-write.component'
import { Write } from './write';
import { SectionSolverService, Section } from '../section-solver.service';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from '../work.service';
import { WriteService } from './write.service';

const target: string = 'write';

@Component({
	selector: 'ms-write',
	templateUrl: './write.component.html',
	styleUrls: ['./write.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class WriteComponent implements OnInit {

	writeList: Write[];
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

	constructor(private writeService: WriteService,
		private pageTitleService: PageTitleService,
		private route: ActivatedRoute,
		private sectionService: SectionSolverService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
			this.pageTitleService.setTitle("Scriviamo");

			this.writeService.getList(this.section.id)
				.subscribe(
					res => this.writeList = res as Write[],
					err => console.log('Error occured : ' + err)
				);
		});

	}


}
