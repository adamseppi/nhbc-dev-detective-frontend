import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService } from './login.service'
import { LoginModel } from './login.model'

import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = new LoginModel();
  ngOnInit(): void {

    this.loginModel.username = '';
    this.loginModel.password = '';
  }
  goBack(): void {
    this.location.back();
  }
  login(): void {
    this.loginService.login(this.loginModel.username, this.loginModel.password).then
      (
      x => {
        if (x) {
          this.router.navigateByUrl('/dashboard');
        }
      }
      )
      .catch(x => {
        //todo 
      }
      )
  }


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private loginService: LoginService,
    private router: Router

  ) { }
}

