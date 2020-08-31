import { Media } from './../../media';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../../core/route-animation/route.animation';
import { TalkService } from './../talk.service';
import { Talk } from './../talk';
import { ActivatedRoute } from '@angular/router'
import { Section, SectionSolverService } from '../../section-solver.service'
import { Router } from '@angular/router'
import { AuthenticationService } from './../../../authentication/authentication.service';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ms-form-talk',
  templateUrl: './form-talk.component.html',
  styleUrls: ['./form-talk.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FormTalkComponent implements OnInit {
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public id: string;
  public talk: Talk;
  public form: FormGroup;
  public audio: Media;
  public picture: Media;
  private section: Section;

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private talkService: TalkService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    public auth: AuthenticationService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.audio = new Media();
    this.picture = new Media();
    this.cardTitle = 'Carica il nuovo esercizio';
    this.cardSubmitButtonTitle = 'Carica esercizio';
    this.route.params.subscribe(params => {
      this.translate.get('Parliamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])]
      });
      if (!!this.id) {
        this.cardTitle = 'Modifica l\'esercizio';
        this.cardSubmitButtonTitle = 'Modifica esercizio';
        this.talkService.getOne(this.id).subscribe(
          res => {
            this.talk = res as Talk;
            this.objToForm(this.talk);
          },
          err => console.log('Error occured : ' + err)
        );
      }
    });
  }

  onPictureChanged(file: Media) {
    this.picture = file;
  }

  onAudioChanged(file: Media) {
    this.audio = file;
  }

  public onSubmit() {
    if (this.isFormValid()) {
      const observable$ = !!this.id ? this.talkService.update(this.formToObj(), this.id) : this.talkService.create(this.formToObj());
      this.handleRequest(observable$);
    }
  }

  isFormValid() {
    return this.form.valid && !!this.picture.value && !!this.audio.value;
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/talk']);
  }

  public objToForm(talk: Talk) {
    this.form.controls.title.setValue(talk.title);
    this.picture = talk.picture;
    this.audio = talk.audio;
  }

  public formToObj() {
    let talk = new Talk();
    talk.unit_id = this.section.id;
    if (!!this.talk) {
      talk = this.talk;
    }
    talk.title = this.form.controls.title.value;
    talk.picture = this.picture;
    talk.audio = this.audio;
    return talk;
  }

  private handleRequest(observable$: Observable<any>) {
    observable$.subscribe(
      (res: any) => {
        console.log(res);
        this.goToListPage();
      },
      (err: any) => console.log('Error occured : ' + err)
    );
  }
}
