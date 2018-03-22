import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringsInputComponent } from './strings-input/strings-input.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input/file-input.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FormAnswerComponent } from './form-answer/form-answer.component';
import { AnswersInputComponent } from './answers-input/answers-input.component';
import { QuestionsInputComponent } from './questions-input/questions-input.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { TranslateModule } from 'ng2-translate';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    TranslateModule.forRoot()
  ],
  exports: [StringsInputComponent, FileInputComponent, FormAnswerComponent, AnswersInputComponent, QuestionsInputComponent, FormQuestionComponent, AudioPlayerComponent],
  declarations: [StringsInputComponent, FileInputComponent, FormAnswerComponent, AnswersInputComponent, QuestionsInputComponent, FormQuestionComponent, AudioPlayerComponent]
})
export class CommonComponentModule {
}
