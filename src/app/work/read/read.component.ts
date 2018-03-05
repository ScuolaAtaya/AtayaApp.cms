import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";

@Component({
  selector: 'ms-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class ReadComponent implements OnInit {

  constructor( private pageTitleService: PageTitleService) { }
  ngOnInit() {
    this.pageTitleService.setTitle("Leggiamo");
  }

}
