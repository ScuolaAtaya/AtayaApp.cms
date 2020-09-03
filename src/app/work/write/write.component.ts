import { Media } from './../media';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { Write } from './write';
import { SectionSolverService, Section } from '../section-solver.service';
import { ActivatedRoute } from '@angular/router';
import { WriteService } from './write.service';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from './../../common/utils.service';
import { Router } from '@angular/router'
import { environment } from 'environments/environment';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'ms-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class WriteComponent implements OnInit {
  writeList: Write[];
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
    private writeService: WriteService,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    public workListMenuItems: WorkListMenuItems,
    public utils: UtilsService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>  this.section = this.sectionService.retrieveSection(params));
    this.translate.get('Scriviamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
    this.downloadData();
  }

  menuAction(item: any, menutItem: any) {
    const type = menutItem.type;
    const id = item._id;
    if (type === 'delete') {
      this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
        if (result) {
          this.writeService.delete(id).subscribe(
            () => this.downloadData(),
            err => console.log('Error occured : ' + err)
          );
        }
      });
    } else {
      this.router.navigate([this.section.name + '/write/exercise', id]);
    }
  }

  getMediaUrl(picture: Media) {
    return environment.baseUrlImage + '/' + picture.value;
  }

  downloadData() {
    this.writeService.getList(this.section.id).subscribe(
      res => this.writeList = res as Write[],
      err => console.log('Error occured : ' + err)
    );
  }
}
