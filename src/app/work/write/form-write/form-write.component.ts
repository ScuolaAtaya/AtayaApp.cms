import { Media } from './../../media';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../../core/route-animation/route.animation';
import { Router } from '@angular/router'
import { Write } from './../write';
import { Section, SectionSolverService } from '../../section-solver.service'
import { WriteService } from './../write.service';
import { ActivatedRoute } from '@angular/router'
import { AuthenticationService } from './../../../authentication/authentication.service';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ms-form-write',
  templateUrl: './form-write.component.html',
  styleUrls: ['./form-write.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FormWriteComponent implements OnInit {
  cardTitle: string;
  cardSubmitButtonTitle: string;
  section: Section;
  id: string;
  write: Write;
  form: FormGroup;
  picture: Media;
  audio: Media;
  letters: string[];

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private writeService: WriteService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    public auth: AuthenticationService,
    private translate: TranslateService
  ) {
    this.picture = new Media();
    this.audio = new Media();
    this.letters = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.translate.get('Scriviamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      this.cardTitle = !!this.id ? 'Modifica l\'esercizio' : 'Carica il nuovo esercizio';
      this.cardSubmitButtonTitle = !!this.id ? 'Modifica esercizio' : 'Carica esercizio';
      if (!!this.id) {
        this.writeService.getOne(this.id).subscribe(
          res => {
            this.write = res as Write;
            this.objToForm(this.write);
          },
          err => console.log('Error occured : ' + err)
        );
      }
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        word: [null, Validators.compose([Validators.required])]
      });
    });
  }

  onPictureChanged(file: Media) {
    this.picture = file;
  }

  onAudioChanged(file: Media) {
    this.audio = file;
  }

  onSubmit() {
    if (this.isFormValid()) {
      const observable$ = !!this.id ? this.writeService.update(this.formToObj(), this.id) : this.writeService.create(this.formToObj());
      this.handleRequest(observable$);
    }
  }

  isFormValid() {
    return this.form.valid && !!this.picture.value && !!this.audio.value;
  }

  goToListPage() {
    this.router.navigate([this.section.name + '/write']);
  }

  private objToForm(write: Write) {
    this.form.controls.title.setValue(write.title);
    this.form.controls.word.setValue(write.word);
    this.letters = write.letters;
    this.picture = write.picture;
    this.audio = write.audio;
  }

  private formToObj() {
    let write = new Write();
    write.unit_id = this.section.id;
    if (!!this.write) {
      write = this.write;
    }
    write.title = this.form.controls.title.value;
    write.word = this.form.controls.word.value;
    write.picture = this.picture;
    write.audio = this.audio;
    write.letters = this.letters;
    return write;
  }

  private handleRequest(observable$: Observable<any>) {
    observable$.subscribe(
      () => this.goToListPage(),
      (err: any) => console.log('Error occured : ' + err)
    );
  }
}
