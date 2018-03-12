import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'ms-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss']
})
export class FormAnswerComponent implements OnInit {
  public cardTitle: string
  public cardSubmitButtonTitle: string

  public form: FormGroup;

  public answer: any
  public audio: string
  public correct: boolean

  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<FormAnswerComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.cardTitle = 'Carica la nuova risposta'
    this.cardSubmitButtonTitle = 'Carica risposta'

    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])]
    })
    this.correct = false

    if (this.data) {
      this.cardTitle = 'Modifica la risposta'
      this.cardSubmitButtonTitle = 'Modifica risposta'
      this.answer = this.data
      this.objToForm()
    }
  }

  onFileNameChanged(fileName: string) {
    this.audio = fileName
  }

  isFormValid() {
    return (this.form.valid && this.correct !== undefined && this.audio !== undefined)
  }

  public objToForm() {
    this.form.controls.title.setValue(this.answer.title)
    this.correct = this.answer.correct
    this.audio = this.answer.audio
  }

  public formToObj() {
    let obj = {}
    obj['title'] = this.form.controls.title.value 
    obj['correct'] = this.correct
    obj['audio'] = this.audio
    return obj
  }

  public onSubmit() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.formToObj())
    }
  }
  
  public onClose() {
    this.dialogRef.close(undefined)
  }
}
