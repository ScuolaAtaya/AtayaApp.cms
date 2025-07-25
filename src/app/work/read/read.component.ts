import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { ReadService } from './read.service';
import { Read } from './read';
import { ActivatedRoute, Router } from '@angular/router';
import { Section, SectionSolverService } from '../section-solver.service';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from '../../common/utils.service';
import { TranslateService } from 'ng2-translate';
import { Media } from '../media';
import { environment } from 'environments/environment';

@Component({
  selector: 'ms-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class ReadComponent implements OnInit {
  readList: Read[];
  section: Section;
  groupOptions: SortablejsOptions = {
    group: 'testGroup',
    handle: '.drag-handle',
    animation: 300
  };

  simpleOptions: SortablejsOptions = {
    animation: 300
  };

  constructor(
    public workListMenuItems: WorkListMenuItems,
    public utils: UtilsService,
    private readService: ReadService,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section = this.sectionService.retrieveSection(params);
      this.downloadData();
    });
    this.translate.get('Leggiamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
  }

  menuAction(item: any, menutItem: any) {
    const type = menutItem.type;
    const id = item._id;
    if (type === 'delete') {
      this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
        if (result) {
          this.readService.delete(id).subscribe(
            () => this.downloadData(),
            (err: string) => console.log('Error occured : ' + err)
          );
        }
      });
    } else {
      this.router.navigate([this.section.name + '/read/exercise', id]);
    }
  }

  getMediaUrl(picture: Media) {
    return environment.baseUrlImage + '/' + picture.value;
  }


  private downloadData() {
    this.readService.getList(this.section.id).subscribe(
      res => this.readList = res as Read[],
      err => console.log('Error occured : ' + err)
    );
  }
}
