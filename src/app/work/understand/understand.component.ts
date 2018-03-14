import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from "angular-sortablejs";
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { FormUnderstandComponent } from './form-understand/form-understand.component'
import { UnderstandService } from './understand.service';
import { Understand } from './understand';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionSolverService, Section } from '../section-solver.service';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from '../../common/utils.service';
import {TranslateService} from "ng2-translate";

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
    audio: HTMLAudioElement;
    trackSize: number;
    currentTime: number;
    dragging = false;
    playing = false;
    playButtonIcon = 'play_arrow';
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
		private translate: TranslateService
	) { }

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
                            console.log(res)
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

    toggleAudio() {
        if (this.playing) {
            // Do stuff
            this.playButtonIcon = 'play_arrow';
            this.playing = false;
            if (this.audio !== undefined) {
                this.audio.pause();
            }
        } else {
            // Do other stuff
            this.playButtonIcon = 'pause';
            this.playing = true;
            if (this.audio === undefined) {
                this.setupAudio();
            }
            this.audio.play();
        }
    }

    setupAudio() {
        // stuff and things
        this.audio = new Audio();
        this.audio.src = 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3';
        this.audio.load();
        this.audio.addEventListener('loadedmetadata', (event) => {
            this.trackSize = this.audio.duration
        });
        this.audio.addEventListener('timeupdate', (event) => {
            if (!this.dragging) {
                this.currentTime = this.audio.currentTime;
            }
        });
    }

    formatSeconds(seconds: number) {
        const date = new Date(null);
        date.setSeconds(seconds !== undefined ? seconds : 0); // specify value for SECONDS here
        const result = date.toISOString().substr(14, 5);
        return result
    }

    seekAudio(event) {
        this.audio.currentTime = event.value;
    }

    setDragging(isDragging: boolean) {
        console.log('dragging = ' + isDragging);
        this.dragging = isDragging;
        if (isDragging) {
            addEventListener('mouseup', () => {
                this.dragging = false;
                console.log('dragging = ' + false);
            })
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
