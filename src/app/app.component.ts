import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'gene-app',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneAppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
