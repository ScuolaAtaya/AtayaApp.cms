import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormTalkComponent } from './form-talk/form-talk.component'
import { TalkService } from './talk.service';
import { Talk } from './talk';
import { ActivatedRoute } from '@angular/router';
import { SectionSolverService, Section } from '../section-solver.service';
import { MdDialogRef, MdDialog } from "@angular/material";
import { Router } from '@angular/router'
import { environment } from 'environments/environment';
import { WorkListMenuItems } from '../work-list-menu-items';

@Component({
	selector: 'ms-talk-dialog',
	template: `
	<h1>Sei sicuro di voler continuare?</h1>

	<md-dialog-actions align="end">
	   <button md-button (click)="dialogRef.close(false)">No</button>
	   <button md-button color="primary" (click)="dialogRef.close(true)">Yes</button>
	</md-dialog-actions>
`
})
export class TalkDialog {
	constructor(public dialogRef: MdDialogRef<TalkDialog>) { }
}

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

	dialogRef: MdDialogRef<TalkDialog>;
	talkList: Talk[];

	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	simpleOptions: SortablejsOptions = {
		animation: 300
	};

	private section: Section;

	constructor(private talkService: TalkService,
		private pageTitleService: PageTitleService,
		private route: ActivatedRoute,
		private sectionService: SectionSolverService,
		private dialog: MdDialog,
		private router: Router,
		public workListMenuItems: WorkListMenuItems
	) { }

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

	menuAction(item, menutItem) {
		let type = menutItem.type
		let id = item._id
		if (type == 'delete') {
			this.dialogRef = this.dialog.open(TalkDialog, {
				disableClose: false
			});
			this.dialogRef.afterClosed().subscribe(result => {
				this.dialogRef = null;
				if (result) {
					this.talkService.delete(id).subscribe(
						res => {
							console.log(res)
							this.refresh();
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
		let url = environment.baseUrlImage + '/' + fileName
		return url
	}

	refresh() {
		this.talkService.getList(this.section.id)
		.subscribe(
			res => this.talkList = res as Talk[],
			err => console.log('Error occured : ' + err)
		);
	}
}

