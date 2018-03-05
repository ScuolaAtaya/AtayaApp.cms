import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'ms-form-talk',
  templateUrl: './form-talk.component.html',
  styleUrls: ['./form-talk.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class FormTalkComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Parliamo");
    /*this.form = new FormGroup({
      response: new FormControl('', Validators.required)
    });*/

    this.form = this.fb.group({
      word: [null, Validators.compose([Validators.required])]
    });
  }

  uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
