import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormWriteComponent } from './form-write/form-write.component'
import { WriteService } from './write.service';
import { Write } from './write';

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

	constructor(private writeService: WriteService, private pageTitleService: PageTitleService) { }

	ngOnInit() {

		this.pageTitleService.setTitle("Scriviamo");

		this.writeService.getAll().subscribe(
			res => this.writeList = res,
			err => { console.log('Error occured : ' + err) }
		  );
	
	}

}
