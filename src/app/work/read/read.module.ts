import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadService } from './read.service';
import { ReadComponent } from './read.component';
import { FormReadComponent } from './form-read/form-read.component';
import { MaterialModule } from '@angular/material';
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula";
import { SortablejsModule, SortablejsOptions } from "angular-sortablejs";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DragulaModule,
    SortablejsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [ReadComponent, FormReadComponent],
  providers: [ReadService]
})
export class ReadModule { }
