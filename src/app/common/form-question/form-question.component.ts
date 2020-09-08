import { Answer } from './../../work/answer';
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
  cardTitle: string;
  cardSubmitButtonTitle: string;
  form: FormGroup;
  isUnderstandQuestion: boolean;
  question: Question;
  audio: Media;
  picture: Media;
  answers: Answer[];
  correct: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<FormQuestionComponent>, private fb: FormBuilder) {
    $('.form-question').addClass('app-dark');
    this.correct = false;
  }

  ngOnInit() {
    this.audio = new Media();
    this.picture = new Media();
    this.answers = [];
    this.cardTitle = !!this.data.question ? 'Modifica la domanda' : 'Carica la nuova domanda';
    this.cardSubmitButtonTitle = !!this.data.question ? 'Modifica domanda' : 'Carica domanda';
    this.form = this.fb.group({
      body: [null, Validators.compose([Validators.required])]
    });
    this.isUnderstandQuestion = this.data.isUnderstandQuestion;
    if (!!this.data.question) {
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

  onSubmit() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.formToObj());
    }
  }
  onClose() {
    this.dialogRef.close(undefined);
  }

  isFormValid() {
    return this.form.valid && !!this.audio.value;
  }

  private objToForm(question: Question) {
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

  private formToObj() {
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
}
