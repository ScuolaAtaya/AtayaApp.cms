import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { TalkService } from './../talk.service';
import { Talk } from './../talk';
import {ActivatedRoute} from "@angular/router"
import { Section, SectionSolverService } from '../../section-solver.service'
import { Router } from '@angular/router'
import { environment } from 'environments/environment';
import { AuthenticationService } from './../../../authentication/authentication.service';

enum dropSender {
  none = 0,
  picture = 1,
  audio = 2,
}

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
  public cardTitle: string

  public id: string
  public talk: Talk
  public form: FormGroup;
  public audio: string
  public audioUrl: string
  public picture: string
  public pictureUrl: string

  private section: Section;
  
  public uploader: FileUploader;
  public hasPictureDropZoneOver: Boolean;
  public hasAudioDropZoneOver: Boolean;
  public dropSender: dropSender

  constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private talkService: TalkService, private route: ActivatedRoute, private sectionService: SectionSolverService,
		private router: Router, public auth: AuthenticationService) { }

  ngOnInit() {
    this.cardTitle = 'Nuovo Esercizio'

    this.dropSender = dropSender.none

    this.route.params.subscribe(params => {
      this.pageTitleService.setTitle("Parliamo");

      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id'])
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])]
      });
      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica Esercizio' // TODO Check
        this.talkService.getOne(this.id).subscribe(
          res => {
            this.talk = res as Talk
            this.objToForm(this.talk)
          },
          err => console.log('Error occured : ' + err)
        )
      }
      this.uploader = new FileUploader({
        url: environment.baseUrl + '/media/upload',
        method: 'POST',
        headers: [{ name: 'Authorization', value: 'Bearer '+this.auth.getUser().token }],
        autoUpload: true
      });
      this.uploader.onCompleteItem = (item: any,
        response: string,
        status: number,
        headers: any) => {
        let json = JSON.parse(response)
        let type = json.type
        let name = json.name
        if (this.dropSender == dropSender.picture) {
          this.picture = name
          this.pictureUrl = this.getMediaUrl(this.picture)
        }
        if (this.dropSender == dropSender.audio) {
          this.audio = name
          this.audioUrl = this.getMediaUrl(this.audio)
        }
        this.dropSender = dropSender.none
        return { item, response, status, headers };
      };
      this.hasPictureDropZoneOver = false;
      this.hasAudioDropZoneOver = false;
    })
  }

  fileOverPicture(e: any): void {
    if (e == true) {
      this.dropSender = dropSender.picture
    }
    this.hasPictureDropZoneOver = e;
  }

  fileOverAudio(e: any): void {
    if (e == true) {
      this.dropSender = dropSender.audio
    }
    this.hasAudioDropZoneOver = e;
  }

  public onSubmit() {
    if (this.isFormValid()) {
      if (this.id !== 'undefined') {
        this.talkService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res)
            this.goToListPage()
          },
          err => console.log('Error occured : ' + err)
        )
      }
      else {
        this.talkService.create(this.formToObj()).subscribe(
          res => {
            console.log(res)
            this.goToListPage()
          },
          err => console.log('Error occured : ' + err)
        )
      }
    }
  }

  isFormValid() {
    return (this.form.valid && this.picture !== undefined && this.audio !== undefined)
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/talk'])
  }

  public objToForm(talk: Talk) {
    this.form.controls.title.setValue(talk.title)
    this.picture = talk.picture
    this.pictureUrl = this.getMediaUrl(this.picture)
    this.audio = talk.audio
    this.audioUrl = this.getMediaUrl(this.audio)
  }

  public formToObj() {
    let talk = new Talk()
    talk.unit_id = this.section.id
    if (this.talk) {
      talk = this.talk
    }
    talk.title = this.form.controls.title.value
    talk.picture = this.picture
    talk.audio = this.audio
    return talk
  }

  getMediaUrl(fileName) {
    let url = environment.baseUrlImage + '/' + fileName
    return url
  }
}
