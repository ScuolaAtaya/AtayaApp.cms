import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { TokenInterceptor } from './token-interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthenticationService, AuthGuardService, TokenInterceptor]
})
export class AuthenticationModule { }
