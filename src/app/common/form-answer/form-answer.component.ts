import { Option } from './../../work/options';
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
  cardTitle: string;
  cardSubmitButtonTitle: string;
  form: FormGroup;
  isReadOption: boolean;
  model: any;
  audio: Media;
  correct: boolean;

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<FormAnswerComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    $('.form-answer').addClass('app-dark');
    this.correct = false;
    this.audio = new Media();
  }

  ngOnInit() {
    this.cardTitle = 'Carica la nuova risposta';
    this.cardSubmitButtonTitle = 'Carica risposta';
    this.isReadOption = this.data.isReadOption;
    const controlsConfig = this.isReadOption ?
      { body: [null, Validators.compose([Validators.required])], markerId: [null, Validators.compose([Validators.required])] } :
      { body: [null, Validators.compose([Validators.required])] };
    this.form = this.fb.group(controlsConfig);
    if (!!this.data.model) {
      this.cardTitle = 'Modifica la risposta';
      this.cardSubmitButtonTitle = 'Modifica risposta';
      this.model = this.data.model;
      this.objToForm(this.model);
    }
  }

  onFileChanged(file: Media) {
    this.audio = file;
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
    if (this.isReadOption) {
      return this.form.valid && !!this.audio.value;
    } else {
      return this.form.valid && !!this.audio.value && this.correct !== undefined;
    }
  }

  private objToForm(obj: any) {
    obj = this.isReadOption ? obj as Option : obj as Answer
    this.form.controls.body.setValue(obj.body);
    if (this.isReadOption) {
      this.form.controls.markerId.setValue(obj.markerId);
    } else {
      this.correct = obj.correct;
    }
    this.audio = obj.audio;
  }

  private formToObj() {
    if (this.isReadOption) {
      let option = new Option();
      if (!!this.model) {
        option = this.model;
      }
      option.body = this.form.controls.body.value;
      option.markerId = this.form.controls.markerId.value;
      option.audio = this.audio;
      return option;
    } else {
      let answer = new Answer();
      if (!!this.model) {
        answer = this.model;
      }
      answer.body = this.form.controls.body.value;
      answer.correct = this.correct;
      answer.audio = this.audio;
      return answer;
    }
  }
}
