import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from '../core/route-animation/route.animation';
import { DashboardItems, Menu } from './menu-items';
import { Router } from '@angular/router';


@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {
  dashboardItems: Menu[];

  constructor(dashboardItems: DashboardItems, private pageTitleService: PageTitleService, private router: Router) {
    this.dashboardItems = dashboardItems.getAll();
  }

  ngOnInit = () => this.pageTitleService.setTitle('Home');

  goTo = (route: string) => this.router.navigate([`${route}/menu`]);
}
