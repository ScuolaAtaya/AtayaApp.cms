import { FinalVerificationService } from './../final-verification.service';
import { FinalVerification } from './../final-verification';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from 'app/work/question';
import { Section, SectionSolverService } from 'app/work/section-solver.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'ms-form-final-verification',
  templateUrl: './form-final-verification.component.html',
  styleUrls: ['./form-final-verification.component.scss']
})
export class FormFinalVerificationComponent implements OnInit {
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public id: string;
  public finalVerification: FinalVerification;
  public form: FormGroup;
  public questions: Question[];
  public section: Section;

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    private finalVerificationService: FinalVerificationService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.questions = [];
    this.cardTitle = 'Carica il nuovo esercizio';
    this.cardSubmitButtonTitle = 'Carica esercizio';
    this.route.params.subscribe(params => {
      this.translate.get('Verifica finale').subscribe((translatedText: string) => {
        this.pageTitleService.setTitle(translatedText);
      });
      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id']);
      this.form = this.fb.group({ title: [null, Validators.compose([Validators.required])] });
      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica l\'esercizio';
        this.cardSubmitButtonTitle = 'Modifica esercizio';
        this.finalVerificationService.getOne(this.id).subscribe(
          res => {
            this.finalVerification = res as FinalVerification;
            this.objToForm(this.finalVerification);
          },
          err => console.log('Error occured : ' + err)
        );
      }
    });
  }

  public onSubmit() {
    if (this.isFormValid()) {
      if (this.id !== 'undefined') {
        this.finalVerificationService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res);
            this.goToListPage();
          },
          err => console.log('Error occured : ' + err)
        );
      } else {
        this.finalVerificationService.create(this.formToObj()).subscribe(
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
    return this.form.valid;
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/final']);
  }

  public objToForm(finalVerification: FinalVerification) {
    this.form.controls.title.setValue(finalVerification.title);
    this.questions = finalVerification.questions;
  }

  public formToObj() {
    let finalVerification = new FinalVerification();
    finalVerification.unit_id = this.section.id;
    if (this.finalVerification) {
      finalVerification = this.finalVerification;
    }
    finalVerification.title = this.form.controls.title.value;
    finalVerification.questions = this.questions;
    return finalVerification;
  }
}
