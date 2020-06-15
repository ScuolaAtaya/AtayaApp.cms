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
  public question: Question;
  public audio: Media;
  public answers: any;
  public picture: Media;

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<FormQuestionComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    $('.form-question').addClass('app-dark');
  }

  ngOnInit() {
    this.cardTitle = 'Carica la nuova domanda';
    this.cardSubmitButtonTitle = 'Carica domanda';
    this.form = this.fb.group({
      body: [null, Validators.compose([Validators.required])]
    });
    this.answers = [];
    if (this.data && Object.keys(this.data).length > 0) {
      this.cardTitle = 'Modifica la domanda';
      this.cardSubmitButtonTitle = 'Modifica domanda';
      this.question = this.data;
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
    return this.form.valid && this.audio !== undefined && this.picture !== undefined;
  }

  public objToForm(question: Question) {
    this.form.controls.body.setValue(question.body);
    this.audio = question.audio;
    this.picture = question.picture;
    this.answers = question.answers;
  }

  public formToObj() {
    let question = new Question();
    if (this.question) {
      question = this.question;
    }
    question.body = this.form.controls.body.value;
    question.audio = this.audio;
    question.picture = this.picture;
    question.answers = this.answers;
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
