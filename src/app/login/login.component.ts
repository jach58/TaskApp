import { UserModel } from './../model/UserModel';
import { AuthenticationService } from './../service/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { UserVO } from '../vo/UserVO';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  usernameError = '';
  passwordError = '';
  loginError = '';

  constructor( private authenticationService: AuthenticationService, private router: Router,
    private userModel: UserModel) {}

  ngOnInit() {
  }

  onReset(): void {
    this.username = '';
    this.password = '';
  }

  onLogin() {

    let errorFound = false;
    this.loginError = '';

    if (this.username === '') {
      this.usernameError = 'You Must Enter a Username';
      errorFound = true;
    } else {
      this.usernameError = '';
    }

    if (this.password === '') {
      this.passwordError = 'You Must Enter a Password';
      errorFound = true;
    } else {
      this.passwordError = '';
    }

    if (errorFound === true) {
      return;
    }

    this.authenticationService.authenticate( this.username, this.password)
      .subscribe(
        result => {
          if (result.error) {
            this.loginError = 'We could not log you in';
            return;
          }
          this.userModel.user = result.resultObject as UserVO;
          this.router.navigate(['/tasks']);
        },
        error => {
          this.loginError = 'There was an authentication service error';
        }
      );
  }

}
