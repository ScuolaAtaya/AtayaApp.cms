import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringsInputComponent } from './strings-input/strings-input.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input/file-input.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [StringsInputComponent, FileInputComponent],
  declarations: [StringsInputComponent, FileInputComponent]
})
export class CommonComponentModule { }
