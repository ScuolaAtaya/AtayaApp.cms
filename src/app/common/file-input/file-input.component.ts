import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from 'environments/environment';
import { AuthenticationService } from './../../authentication/authentication.service';

@Component({
  selector: 'ms-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit, OnChanges {
  @Input() fileName: string;
  @Input() type: string;
  @Input() credits: string;
  @Output() onFileNameChanged = new EventEmitter<string>();
  @Output() onCreditsChanged = new EventEmitter<string>();
  public uploader: FileUploader;
  public hasBaseDropZoneOver: Boolean;
  public url: string;
  public loading = false;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: environment.baseUrl + '/media/upload',
      method: 'POST',
      headers: [{ name: 'Authorization', value: 'Bearer ' + this.auth.getUser().token }],
      autoUpload: true
    });
    this.uploader.onProgressItem = () => this.loading = true;
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
      const json = JSON.parse(response);
      const name = json.name;
      this.fileName = name;
      this.onFileNameChanged.emit(this.fileName);
      this.loading = false;
      return { item, response, status, headers };
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes || !changes.fileName) { return; }
    const f = changes.fileName;
    if (f.currentValue !== undefined) {
      this.url = this.getMediaUrl(this.fileName);
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getMediaUrl(fileName) {
    return environment.baseUrlImage + '/' + fileName;
  }

  updateCredits() {
    this.onCreditsChanged.emit(this.credits);
  }
}
