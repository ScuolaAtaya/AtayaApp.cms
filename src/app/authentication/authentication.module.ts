import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthenticationService, AuthGuardService]
})
export class AuthenticationModule { }
