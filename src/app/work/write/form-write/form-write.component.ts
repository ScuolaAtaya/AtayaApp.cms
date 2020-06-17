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
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public section: Section;
  public id: string;
  public write: Write;
  public form: FormGroup;
  public picture: Media;
  public audio: Media;
  public letters: string[];

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private writeService: WriteService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    public auth: AuthenticationService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.picture = new Media();
    this.audio = new Media();
    this.letters = [];
    this.cardTitle = 'Carica il nuovo esercizio';
    this.cardSubmitButtonTitle = 'Carica esercizio';
    this.route.params.subscribe(params => {
      this.translate.get('Scriviamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      if (!!this.id) {
        this.cardTitle = 'Modifica l\'esercizio';
        this.cardSubmitButtonTitle = 'Modifica esercizio';
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

  public onSubmit() {
    if (this.isFormValid()) {
      if (!!this.id) {
        this.writeService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res);
            this.goToListPage();
          },
          err => console.log('Error occured : ' + err)
        );
      } else {
        this.writeService.create(this.formToObj()).subscribe(
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
    return this.form.valid && !!this.picture.value && !!this.audio.value;
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/write']);
  }

  public objToForm(write: Write) {
    this.form.controls.title.setValue(write.title);
    this.form.controls.word.setValue(write.word);
    this.letters = write.letters;
    this.picture = write.picture;
    this.audio = write.audio;
  }

  public formToObj() {
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
}
