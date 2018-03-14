import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {SortablejsOptions} from 'angular-sortablejs';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {UnderstandService} from './understand.service';
import {Understand} from './understand';
import {ActivatedRoute, Router} from '@angular/router';
import {Section, SectionSolverService} from '../section-solver.service';
import {WorkListMenuItems} from '../work-list-menu-items';
import {UtilsService} from '../../common/utils.service';
import {TranslateService} from 'ng2-translate';

@Component({
    selector: 'ms-understand',
    templateUrl: './understand.component.html',
    styleUrls: ['./understand.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
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

    section: Section;

    constructor(private understandService: UnderstandService,
                private pageTitleService: PageTitleService,
                private route: ActivatedRoute,
                private sectionService: SectionSolverService,
                private router: Router,
                public workListMenuItems: WorkListMenuItems,
                public utils: UtilsService,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.section = this.sectionService.retrieveSection(params);
            this.translate.get('Capiamo').subscribe((translatedText: string) => {
                this.pageTitleService.setTitle(translatedText);
            })
            this.downloadData()
        });
    }

    menuAction(item, menutItem) {
        const type = menutItem.type;
        const id = item._id;
        if (type === 'delete') {
            this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
                if (result) {
                    this.understandService.delete(id).subscribe(
                        res => {
                            console.log(res);
                            this.downloadData();
                        },
                        err => console.log('Error occured : ' + err)
                    )
                }
            })
        } else {
            this.router.navigate([this.section.name + '/understand/exercise', id])
        }
    }

    downloadData() {
        this.understandService.getList(this.section.id)
            .subscribe(
                res => this.understandList = res as Understand[],
                err => console.log('Error occured : ' + err)
            );
    }
}
