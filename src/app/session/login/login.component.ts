import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../authentication/authentication.service';

export class User {
  name: string;
  password: string;
}

@Component({
  selector: 'ms-login-session',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  user: User = new User();
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user.name, this.user.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

}



