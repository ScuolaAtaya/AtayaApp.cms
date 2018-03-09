import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { SubSections, Menu } from '../../dashboard/menu-items';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionSolverService, Section } from '../../work/section-solver.service';

@Component({
  selector: 'ms-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class SubSectionComponent implements OnInit {

  public subSectionItems: Menu[];
  section: Section;


  constructor(private pageTitleService: PageTitleService,
    private router: Router,
    subSectionItems: SubSections,
    private sectionService: SectionSolverService,
    private route: ActivatedRoute,
  ) {
    this.subSectionItems = subSectionItems.getAll();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section = this.sectionService.retrieveSection(params);
      this.pageTitleService.setTitle(this.section.title);
    });
  }

  public goTo = (route: string) => this.router.navigate([`/${this.section.name}/${route}`]);


}
