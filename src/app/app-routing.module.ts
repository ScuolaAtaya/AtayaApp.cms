import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './session/login/login.component';
import { LockScreenComponent } from './session/lockscreen/lockscreen.component';
import { WriteComponent } from './work/write/write.component';
import { FormWriteComponent } from './work/write/form-write/form-write.component';
import { ReadComponent } from './work/read/read.component';
import { FormReadComponent } from './work/read/form-read/form-read.component';
import { TalkComponent } from './work/talk/talk.component';
import { FormTalkComponent } from './work/talk/form-talk/form-talk.component';
import { UnderstandComponent } from './work/understand/understand.component';
import { FormUnderstandComponent } from './work/understand/form-understand/form-understand.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { SubSectionComponent } from './dashboard/sub-section/sub-section.component';
import { FinalVerificationComponent } from './work/final-verification/final-verification.component';
import { FormFinalVerificationComponent } from './work/final-verification/form-final-verification/form-final-verification.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'session/lockscreen',
        component: LockScreenComponent,
    }, {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: ':section/write', component: WriteComponent },
            { path: ':section/write/exercise', component: FormWriteComponent },
            { path: ':section/write/exercise/:id', component: FormWriteComponent },
            { path: ':section/read', component: ReadComponent },
            { path: ':section/read/exercise', component: FormReadComponent },
            { path: ':section/read/exercise/:id', component: FormReadComponent },
            { path: ':section/understand', component: UnderstandComponent },
            { path: ':section/understand/exercise', component: FormUnderstandComponent },
            { path: ':section/understand/exercise/:id', component: FormUnderstandComponent },
            { path: ':section/talk', component: TalkComponent },
            { path: ':section/talk/exercise', component: FormTalkComponent },
            { path: ':section/talk/exercise/:id', component: FormTalkComponent },
            { path: ':section/final_verification', component: FinalVerificationComponent },
            { path: ':section/final_verification/exercise', component: FormFinalVerificationComponent },
            { path: ':section/final_verification/exercise/:id', component: FormFinalVerificationComponent },
            { path: ':section/menu', component: SubSectionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {
}
