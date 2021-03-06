import { Observable } from 'rxjs/Observable';
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
  cardTitle: string;
  cardSubmitButtonTitle: string;
  id: string;
  understand: Understand;
  form: FormGroup;
  audio: Media;
  questions: Question[];
  section: Section;

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    private understandService: UnderstandService,
    private translate: TranslateService
  ) {
    this.audio = new Media();
    this.questions = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.translate.get('Capiamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      this.cardTitle = !!this.id ? 'Modifica l\'esercizio' : 'Carica il nuovo esercizio';
      this.cardSubmitButtonTitle = !!this.id ? 'Modifica esercizio' : 'Carica esercizio';
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        video_url: [null, Validators.compose([Validators.required])],
        video_credits: [null]
      });
      if (!!this.id) {
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

  onSubmit() {
    if (this.isFormValid()) {
      const observable$ = !!this.id ?
        this.understandService.update(this.formToObj(), this.id) : this.understandService.create(this.formToObj());
      this.handleRequest(observable$);
    }
  }

  isFormValid() {
    return this.form.valid && !!this.audio.value && this.questions.length > 0;
  }

  goToListPage() {
    this.router.navigate([this.section.name + '/understand']);
  }

  private objToForm(understand: Understand) {
    this.form.controls.title.setValue(understand.title);
    this.form.controls.video_url.setValue(understand.video_url.value);
    this.form.controls.video_credits.setValue(understand.video_url.credits);
    this.audio = understand.audio;
    this.questions = understand.questions;
  }

  private formToObj() {
    let understand = new Understand();
    understand.video_url = new Media();
    understand.unit_id = this.section.id;
    if (!!this.understand) {
      understand = this.understand;
    }
    understand.title = this.form.controls.title.value;
    understand.video_url.value = this.form.controls.video_url.value.replace('https://www.youtube.com/watch?v=', '').trim();
    understand.video_url.credits = this.form.controls.video_credits.value;
    understand.audio = this.audio;
    understand.questions = this.questions;
    return understand;
  }

  private handleRequest(observable$: Observable<any>) {
    observable$.subscribe(
      () => this.goToListPage(),
      (err: any) => console.log('Error occured : ' + err)
    );
  }
}
