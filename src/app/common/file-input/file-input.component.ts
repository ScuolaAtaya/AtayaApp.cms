import { Media } from './../../work/media';
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
  @Input() file: Media;
  @Input() type: string;
  @Output() onFileChanged = new EventEmitter<Media>();
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
      this.file.value = name;
      this.url = this.getMediaUrl(this.file);
      this.onFileChanged.emit(this.file);
      this.loading = false;
      return { item, response, status, headers };
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes || !changes.file) { return; }
    const f = changes.file;
    if (!!f.currentValue) {
      this.url = this.getMediaUrl(this.file);
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getMediaUrl(file: Media) {
    return environment.baseUrlImage + '/' + file.value;
  }

  updateCredits() {
    this.onFileChanged.emit(this.file);
  }
}
