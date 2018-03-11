import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteService } from './write.service';
import { WriteComponent } from './write.component';
import { FormWriteComponent } from './form-write/form-write.component';
import { MaterialModule } from '@angular/material';
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula";
import { SortablejsModule, SortablejsOptions } from "angular-sortablejs";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate/ng2-translate';

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
    RouterModule,
    TranslateModule.forRoot()
  ],
  declarations: [WriteComponent, FormWriteComponent],
  providers: [WriteService]
})
export class WriteModule { }
