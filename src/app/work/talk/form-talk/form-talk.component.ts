import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { TalkService } from './../talk.service';
import { Talk } from './../talk';
import {ActivatedRoute} from "@angular/router"
import { Section, SectionSolverService } from '../../section-solver.service'
import { Router } from '@angular/router'
import { environment } from 'environments/environment';
import { AuthenticationService } from './../../../authentication/authentication.service';
import {TranslateService} from "ng2-translate";

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
  public cardSubmitButtonTitle: string

  public id: string
  public talk: Talk
  public form: FormGroup;
  public audio: string
  public picture: string

  private section: Section;
  public pictureCredits: string;
  public audioCredits: string;
  
  constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private talkService: TalkService, private route: ActivatedRoute, private sectionService: SectionSolverService,
		private router: Router, public auth: AuthenticationService, private translate: TranslateService) { }

  ngOnInit() {
    this.cardTitle = 'Carica il nuovo esercizio'
    this.cardSubmitButtonTitle = 'Carica esercizio'

    this.route.params.subscribe(params => {
      this.translate.get('Parliamo').subscribe((translatedText: string) => {
        this.pageTitleService.setTitle(translatedText);
      })

      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id'])
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])]
      });
      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica l\'esercizio'
        this.cardSubmitButtonTitle = 'Modifica esercizio'
        this.talkService.getOne(this.id).subscribe(
          res => {
            this.talk = res as Talk
            this.objToForm(this.talk)
          },
          err => console.log('Error occured : ' + err)
        )
      }
    })
  }

  onPictureChanged(fileName: string) {
    this.picture = fileName
  }

  onPictureCreditsChanged(credits: string) {
    this.pictureCredits = credits;
  }

  onAudioChanged(fileName: string) {
    this.audio = fileName
  }

  onAudioCreditsChanged(credits: string) {
    this.audioCredits = credits;
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
    this.audio = talk.audio
    this.pictureCredits = talk.picture_credits;
    this.audioCredits = talk.audio_credits;
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
    talk.picture_credits = this.pictureCredits;
    talk.audio_credits = this.audioCredits;
    return talk
  }
}
