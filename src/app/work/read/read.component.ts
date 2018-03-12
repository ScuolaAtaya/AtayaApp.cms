import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormReadComponent } from './form-read/form-read.component'
import { ReadService } from './read.service';
import { Read } from './read';
import { ActivatedRoute, Router } from '@angular/router';
import { Section, SectionSolverService } from '../section-solver.service';
import { environment } from 'environments/environment';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from '../../common/utils.service';

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
		private sectionService: SectionSolverService,
		private router: Router,
		public workListMenuItems: WorkListMenuItems,
		public utils: UtilsService
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
		});

		this.pageTitleService.setTitle("Leggiamo");
		this.downloadData()
	}

	menuAction(item, menutItem) {
		let type = menutItem.type
		let id = item._id
		if (type == 'delete') {
			this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
				if (result) {
					this.readService.delete(id).subscribe(
						res => {
							console.log(res)
							this.downloadData();
						},
						err => console.log('Error occured : ' + err)
					)
				}
			})
		}
		else {
			this.router.navigate([this.section.name + '/read/exercise', id])
		}
	}

	getMediaUrl(fileName) {
		return environment.baseUrlImage + '/' + fileName
	}

	downloadData() {
		this.readService.getList(this.section.id).subscribe(
			res => this.readList = res as Read[],
			err => console.log('Error occured : ' + err)
		);

	}

}
