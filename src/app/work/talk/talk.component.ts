import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormTalkComponent } from './form-talk/form-talk.component'
import { TalkService } from './talk.service';
import { Talk } from './talk';
import { ActivatedRoute } from '@angular/router';
import { SectionSolverService, Section } from '../section-solver.service';
import { Router } from '@angular/router'
import { environment } from 'environments/environment';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from './../../common/utils.service';
import {TranslateService} from "ng2-translate";

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
		private sectionService: SectionSolverService,
		private router: Router,
		public workListMenuItems: WorkListMenuItems,
		public utils: UtilsService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.section = this.sectionService.retrieveSection(params);
			this.translate.get('Parliamo').subscribe((translatedText: string) => {
				this.pageTitleService.setTitle(translatedText);
			})
			this.downloadData()
		});
	}

	menuAction(item, menutItem) {
		let type = menutItem.type
		let id = item._id
		if (type == 'delete') {
			this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
				if (result) {
					this.talkService.delete(id).subscribe(
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
			this.router.navigate([this.section.name + '/talk/exercise', id])
		}
	}

	getMediaUrl(fileName) {
		return environment.baseUrlImage + '/' + fileName
	}

	downloadData() {
		this.talkService.getList(this.section.id)
		.subscribe(
			res => this.talkList = res as Talk[],
			err => console.log('Error occured : ' + err)
		);
	}
}

