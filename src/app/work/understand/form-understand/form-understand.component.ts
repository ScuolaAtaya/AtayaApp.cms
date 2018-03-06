import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'ms-form-understand',
  templateUrl: './form-understand.component.html',
  styleUrls: ['./form-understand.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class FormUnderstandComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder, private pageTitleService: PageTitleService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Scriviamo");
    /*this.form = new FormGroup({
      response: new FormControl('', Validators.required)
    });*/

    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      word: [null, Validators.compose([Validators.required])]
  });
}

uploader: FileUploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});
hasBaseDropZoneOver = false;
hasAnotherDropZoneOver = false;

fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
}

fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
}
/*
  public audioFiles: UploadFile[] = [new UploadFile('audio', [])];
  public imageFiles: UploadFile[] = [new UploadFile('image', [])];

  public droppedAudio(event: UploadEvent) {
    this.dropped(event, this.audioFiles);
  }

  public droppedImage(event: UploadEvent) {
    this.dropped(event, this.imageFiles);
  }


  public dropped(event: UploadEvent, fileArray: UploadFile[]) {

    event.files.forEach((it) => {
      fileArray.push(it);
      
      it.fileEntry.file(info => {
        console.log(info.size);
      });
    });
  }
*/
}
