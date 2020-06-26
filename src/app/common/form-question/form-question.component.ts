import { Media } from './../../work/media';
import { Question } from './../../work/question';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
declare var $: any;

@Component({
  selector: 'ms-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit {
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public form: FormGroup;
  public isUnderstandQuestion: boolean;
  public question: Question;
  public audio: Media;
  public picture: Media;
  public answers: any;
  public correct: boolean;

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<FormQuestionComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    $('.form-question').addClass('app-dark');
    this.correct = false;
  }

  ngOnInit() {
    this.audio = new Media();
    this.picture = new Media();
    this.answers = [];
    this.cardTitle = 'Carica la nuova domanda';
    this.cardSubmitButtonTitle = 'Carica domanda';
    this.form = this.fb.group({
      body: [null, Validators.compose([Validators.required])]
    });
    this.isUnderstandQuestion = this.data.isUnderstandQuestion;
    if (!!this.data.question) {
      this.cardTitle = 'Modifica la domanda';
      this.cardSubmitButtonTitle = 'Modifica domanda';
      this.question = this.data.question;
      this.objToForm(this.question);
    }
  }

  onAudioChanged(file: Media) {
    this.audio = file;
  }

  onPictureChanged(file: Media) {
    this.picture = file;
  }

  isFormValid() {
    if (this.isUnderstandQuestion) {
      return this.form.valid && !!this.audio.value;
    } else {
      return this.form.valid && !!this.audio.value && this.correct !== undefined;
    }
  }

  public objToForm(question: Question) {
    this.form.controls.body.setValue(question.body);
    this.audio = question.audio;
    if (!!question.picture) {
      this.picture = question.picture;
    }
    if (this.isUnderstandQuestion) {
      this.answers = question.answers;
    } else {
      this.correct = question.answers;
    }
  }

  public formToObj() {
    let question = new Question();
    if (!!this.question) {
      question = this.question;
    }
    question.body = this.form.controls.body.value;
    question.audio = this.audio;
    question.picture = !!this.picture.value ? this.picture : undefined;
    question.answers = this.isUnderstandQuestion ? this.answers : this.correct;
    return question;
  }

  public onSubmit() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.formToObj());
    }
  }
  public onClose() {
    this.dialogRef.close(undefined);
  }
}
