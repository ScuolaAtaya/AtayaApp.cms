import { FinalVerificationService } from './final-verification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeInAnimation } from 'app/core/route-animation/route.animation';
import { Read } from '../read/read';
import { SortablejsOptions } from 'angular-sortablejs';
import { Section, SectionSolverService } from '../section-solver.service';
import { ReadService } from '../read/read.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkListMenuItems } from '../work-list-menu-items';
import { UtilsService } from 'app/common/utils.service';
import { TranslateService } from 'ng2-translate';
import { environment } from 'environments/environment';
@Component({
  selector: 'ms-final-verification',
  templateUrl: './final-verification.component.html',
  styleUrls: ['./final-verification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FinalVerificationComponent implements OnInit {
  finalVerificationList: any[];
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

  constructor(
    private finalVerificationService: FinalVerificationService,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    public workListMenuItems: WorkListMenuItems,
    public utils: UtilsService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.section = this.sectionService.retrieveSection(params));
    this.translate.get('Verifica finale').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
    this.downloadData();
  }

  menuAction(item, menutItem) {
    const type = menutItem.type
    const id = item._id
    if (type === 'delete') {
      this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
        if (result) {
          this.finalVerificationService.delete(id).subscribe(res => {
            console.log(res);
            this.downloadData();
          },
            err => console.log('Error occured : ' + err)
          );
        }
      });
    } else {
      this.router.navigate([this.section.name + '/read/exercise', id]);
    }
  }

  getMediaUrl(fileName) {
    return environment.baseUrlImage + '/' + fileName;
  }

  downloadData() {
    this.finalVerificationService.getList(this.section.id).subscribe(
      res => this.finalVerificationList = res,
      err => console.log('Error occured : ' + err)
    );
  }
}
