import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringsInputComponent } from './strings-input/strings-input.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input/file-input.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FormAnswerComponent } from './form-answer/form-answer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  exports: [StringsInputComponent, FileInputComponent, FormAnswerComponent],
  declarations: [StringsInputComponent, FileInputComponent, FormAnswerComponent]
})
export class CommonComponentModule { }
