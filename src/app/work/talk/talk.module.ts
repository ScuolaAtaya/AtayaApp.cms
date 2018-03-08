import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkService } from './talk.service';
import { TalkComponent } from './talk.component';
import { FormTalkComponent } from './form-talk/form-talk.component';
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
  declarations: [TalkComponent, FormTalkComponent],
  providers: [TalkService]
})
export class TalkModule { }
