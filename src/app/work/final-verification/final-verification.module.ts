import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SortablejsModule } from "angular-sortablejs";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { CommonComponentModule } from '../../common/common.module';
import { FinalVerificationComponent } from './final-verification.component';

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
  declarations: [FinalVerificationComponent],
  providers: [FinalVerificationService]
})
export class FinalVerificationModule { }
