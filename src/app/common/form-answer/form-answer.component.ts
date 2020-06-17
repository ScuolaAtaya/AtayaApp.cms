import { Media } from './../../work/media';
import { Answer } from './../../work/answer';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
declare var $: any;

@Component({
  selector: 'ms-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss']
})
export class FormAnswerComponent implements OnInit {
  public cardTitle: string;
  public cardSubmitButtonTitle: string;
  public form: FormGroup;
  public answer: Answer;
  public audio: Media;
  public correct: boolean;

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<FormAnswerComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    $('.form-answer').addClass('app-dark');
    this.correct = false;
  }

  ngOnInit() {
    this.audio = new Media();
    this.cardTitle = 'Carica la nuova risposta';
    this.cardSubmitButtonTitle = 'Carica risposta';
    this.form = this.fb.group({
      body: [null, Validators.compose([Validators.required])]
    });
    if (this.data && Object.keys(this.data).length > 0) {
      this.cardTitle = 'Modifica la risposta';
      this.cardSubmitButtonTitle = 'Modifica risposta';
      this.answer = this.data;
      this.objToForm(this.answer);
    }
  }

  onFileChanged(file: Media) {
    this.audio = file;
  }

  isFormValid() {
    return this.form.valid && this.correct !== undefined && !!this.audio.value;
  }

  public objToForm(answer: Answer) {
    this.form.controls.body.setValue(answer.body);
    this.correct = answer.correct;
    this.audio = answer.audio;
  }

  public formToObj() {
    let answer = new Answer();
    if (!!this.answer) {
      answer = this.answer;
    }
    answer.body = this.form.controls.body.value;
    answer.correct = this.correct;
    answer.audio = this.audio;
    return answer;
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
