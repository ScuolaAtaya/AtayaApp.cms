import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringsInputComponent } from './strings-input/strings-input.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [StringsInputComponent],
  declarations: [StringsInputComponent]
})
export class CommonComponentModule { }
