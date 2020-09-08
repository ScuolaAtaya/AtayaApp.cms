import { FinalVerificationService } from './../final-verification.service';
import { FinalVerification } from './../final-verification';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from 'app/work/question';
import { Section, SectionSolverService } from 'app/work/section-solver.service';
import { PageTitleService } from 'app/core/page-title/page-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ms-form-final-verification',
  templateUrl: './form-final-verification.component.html',
  styleUrls: ['./form-final-verification.component.scss']
})
export class FormFinalVerificationComponent implements OnInit {
  cardTitle: string;
  cardSubmitButtonTitle: string;
  id: string;
  finalVerification: FinalVerification;
  form: FormGroup;
  questions: Question[];
  section: Section;

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    private finalVerificationService: FinalVerificationService,
    private translate: TranslateService
  ) {
    this.questions = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.translate.get('Verifica finale').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      this.cardTitle = !!this.id ? 'Modifica l\'esercizio' : 'Carica il nuovo esercizio';
      this.cardSubmitButtonTitle = !!this.id ? 'Modifica esercizio' : 'Carica esercizio';
      this.form = this.fb.group({ title: [null, Validators.compose([Validators.required])] });
      if (!!this.id) {
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

  onSubmit() {
    if (this.isFormValid()) {
      const observable$ = !!this.id ?
        this.finalVerificationService.update(this.formToObj(), this.id) : this.finalVerificationService.create(this.formToObj());
      this.handleRequest(observable$);
    }
  }

  isFormValid() {
    return this.form.valid && this.questions.length > 0;
  }

  goToListPage() {
    this.router.navigate([this.section.name + '/final']);
  }

  private objToForm(finalVerification: FinalVerification) {
    this.form.controls.title.setValue(finalVerification.title);
    this.questions = finalVerification.questions;
  }

  private formToObj() {
    let finalVerification = new FinalVerification();
    finalVerification.unit_id = this.section.id;
    if (!!this.finalVerification) {
      finalVerification = this.finalVerification;
    }
    finalVerification.title = this.form.controls.title.value;
    finalVerification.questions = this.questions;
    return finalVerification;
  }

  private handleRequest(observable$: Observable<any>) {
    observable$.subscribe(
      () => this.goToListPage(),
      (err: any) => console.log('Error occured : ' + err)
    );
  }
}
