import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WriteModule} from './write/write.module';
import {ReadModule} from './read/read.module';
import {UnderstandModule} from './understand/understand.module';
import {TalkModule} from './talk/talk.module';
import {SectionSolverService} from './section-solver.service';
import { FinalVerificationModule } from './final-verification/final-verification.module';

@NgModule({
    imports: [
        CommonModule,
        WriteModule,
        ReadModule,
        UnderstandModule,
        TalkModule,
        FinalVerificationModule
    ],
    declarations: [],
    providers: [SectionSolverService]
})
export class WorkModule {
}
