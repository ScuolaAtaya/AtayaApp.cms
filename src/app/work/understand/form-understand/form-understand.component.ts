import { Media } from './../../media';
import { Question } from './../../question';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../../core/route-animation/route.animation';
import { Understand } from '../understand';
import { UnderstandService } from './../understand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionSolverService, Section } from '../../section-solver.service';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'ms-form-understand',
  templateUrl: './form-understand.component.html',
  styleUrls: ['./form-understand.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FormUnderstandComponent implements OnInit {
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public id: string;
  public understand: Understand;
  public form: FormGroup;
  public audio: Media;
  public questions: Question[];
  public section: Section;

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    private understandService: UnderstandService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.audio = new Media();
    this.cardTitle = 'Carica il nuovo esercizio';
    this.cardSubmitButtonTitle = 'Carica esercizio';
    this.route.params.subscribe(params => {
      this.translate.get('Capiamo').subscribe((translatedText: string) => {
        this.pageTitleService.setTitle(translatedText);
      });
      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id']);
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        video_url: [null, Validators.compose([Validators.required])],
        video_credits: [null]
      });
      this.questions = [];
      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica l\'esercizio';
        this.cardSubmitButtonTitle = 'Modifica esercizio';
        this.understandService.getOne(this.id).subscribe(
          res => {
            this.understand = res as Understand;
            this.objToForm(this.understand);
          },
          err => console.log('Error occured : ' + err)
        );
      }
    });
  }

  onAudioChanged(file: Media) {
    this.audio = file;
  }

  public onSubmit() {
    if (this.isFormValid()) {
      if (this.id !== 'undefined') {
        this.understandService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res);
            this.goToListPage();
          },
          err => console.log('Error occured : ' + err)
        );
      } else {
        this.understandService.create(this.formToObj()).subscribe(
          res => {
            console.log(res);
            this.goToListPage();
          },
          err => console.log('Error occured : ' + err)
        );
      }
    }
  }

  isFormValid() {
    return this.form.valid && this.audio !== undefined;
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/understand']);
  }

  public objToForm(understand: Understand) {
    this.form.controls.title.setValue(understand.title);
    this.form.controls.video_url.setValue(understand.video_url.value);
    this.form.controls.video_credits.setValue(understand.video_url.credits);
    this.audio = understand.audio;
    this.questions = understand.questions;
  }

  public formToObj() {
    let understand = new Understand();
    understand.video_url = new Media();
    understand.unit_id = this.section.id;
    if (this.understand) {
      understand = this.understand;
    }
    understand.title = this.form.controls.title.value;
    understand.video_url.value = this.form.controls.video_url.value.replace('https://www.youtube.com/watch?v=', '');
    console.log('video_url: ' + understand.video_url.value);
    understand.video_url.credits = this.form.controls.video_credits.value;
    understand.audio = this.audio;
    understand.questions = this.questions;
    return understand;
  }
}
