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

	private section: Section;

  constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private talkService: TalkService, private route: ActivatedRoute, private sectionService: SectionSolverService,
		private router: Router) { }

  ngOnInit() {
    this.cardTitle = 'Nuovo Esercizio'

    this.route.params.subscribe(params => {
      this.pageTitleService.setTitle("Parliamo");

      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id'])
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        picture: [null, Validators.compose([Validators.required])],
        audio: [null, Validators.compose([Validators.required])]
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
    })
  }
  public onFormSubmit() {
    if (this.form.valid) {
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

  public goToListPage() {
    this.router.navigate([this.section.name + '/talk'])
  }

  public objToForm(talk: Talk) {
    this.form.controls.title.setValue(talk.title)
    this.form.controls.picture.setValue(talk.picture)
    this.form.controls.audio.setValue(talk.audio)
  }

  public formToObj() {
    let talk = new Talk()
    talk.unit_id = this.section.id
    if (this.talk) {
      talk = this.talk
    }
    talk.title = this.form.controls.title.value
    talk.picture = this.form.controls.picture.value
    talk.audio = this.form.controls.audio.value
    return talk
  }

   /*
  uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
    */
}
