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
  public question: any;
  public audio: string;
  public answers: any[];
  public audioCredits: string;
  public picture: string;
  public pictureCredits: string;

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

  onAudioChanged(fileName: string) {
    this.audio = fileName;
  }

  onAudioCreditsChanged(credits: string) {
    this.audioCredits = credits;
  }

  onPictureChanged(fileName: string) {
    this.picture = fileName;
  }

  onPictureCreditsChanged(credits: string) {
    this.pictureCredits = credits;
  }

  isFormValid() {
    return this.form.valid && this.audio !== undefined && this.picture !== undefined;
  }

  public objToForm(answer: any) {
    this.form.controls.body.setValue(answer.body);
    this.audio = answer.audio;
    this.answers = answer.answers;
    this.audioCredits = answer.audio_credits;
    this.picture = answer.picture;
    this.pictureCredits = answer.picture_credits;
  }

  public formToObj() {
    let obj = {};
    if (this.question) {
      obj = this.question;
    }
    obj['body'] = this.form.controls.body.value;
    obj['audio'] = this.audio;
    obj['answers'] = this.answers;
    obj['audio_credits'] = this.audioCredits;
    obj['picture'] = this.picture;
    obj['picture_credits'] = this.pictureCredits;
    return obj;
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
