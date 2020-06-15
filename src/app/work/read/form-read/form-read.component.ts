import { Media } from './../../media';
import { Answer } from './../../answer';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../../core/route-animation/route.animation';
import { Read } from '../read';
import { Section, SectionSolverService } from '../../section-solver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadService } from './../read.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'ms-form-read',
  templateUrl: './form-read.component.html',
  styleUrls: ['./form-read.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FormReadComponent implements OnInit {
  public form: FormGroup;
  public cardTitle: string
  public cardSubmitButtonTitle: string
  public id: string
  public read: Read
  public picture: Media;
  private section: Section;
  public options: Answer[];

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private readService: ReadService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.picture = new Media();
    this.cardTitle = 'Carica il nuovo esercizio';
    this.cardSubmitButtonTitle = 'Carica esercizio';
    this.options = [];
    this.route.params.subscribe(params => {
      this.translate.get('Leggiamo').subscribe((translatedText: string) => {
        this.pageTitleService.setTitle(translatedText);
      })
      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id']);
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])]
      });
      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica l\'esercizio';
        this.cardSubmitButtonTitle = 'Modifica esercizio';
        this.readService.getOne(this.id).subscribe(
          res => {
            this.read = res as Read;
            this.objToForm(this.read);
          },
          err => console.log('Error occured : ' + err)
        );
      }
    });
  }

  onPictureChanged(file: Media) {
    this.picture = file;
  }

  public onSubmit() {
    if (this.isFormValid()) {
      if (this.id !== 'undefined') {
        this.readService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res);
            this.goToListPage();
          },
          err => console.log('Error occured : ' + err)
        );
      } else {
        this.readService.create(this.formToObj()).subscribe(
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
    return this.form.valid && this.picture !== undefined;
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/read']);
  }

  public objToForm(read: Read) {
    this.form.controls.title.setValue(read.title);
    this.picture = read.picture;
    this.options = read.options;
  }

  public formToObj() {
    let read = new Read();
    read.unit_id = this.section.id;
    if (this.read) {
      read = this.read;
    }
    read.title = this.form.controls.title.value;
    read.picture = this.picture;
    read.options = this.options;
    return read;
  }
}
