import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderstandService } from './understand.service';
import { UnderstandComponent } from './understand.component';
import { FormUnderstandComponent } from './form-understand/form-understand.component';
import { MaterialModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SortablejsModule } from 'angular-sortablejs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonComponentModule } from '../../common/common.module';
import { TranslateModule } from 'ng2-translate';

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
    TranslateModule.forRoot(),
    CommonComponentModule
  ],
  declarations: [UnderstandComponent, FormUnderstandComponent],
  providers: [UnderstandService]
})
export class UnderstandModule { }
