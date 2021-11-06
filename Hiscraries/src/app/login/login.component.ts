import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestsharedService } from '../testshared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formlogin: FormGroup;
  formregister: FormGroup;
  isLoginState: boolean;
  errorMessage: string = '';
  
  constructor(private formBuilder: FormBuilder, private service: TestsharedService, private router: Router) {
    this.isLoginState = true;

    this.formlogin = this.formBuilder.group({
      username: '',
      password: ''
    })

    this.formregister = this.formBuilder.group({
      username: '',
      password: '',
      email: undefined,
      dob: undefined
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   }

  ngOnInit(): void {
    if (this.service.isAuthenticated())
    {
      this.router.navigateByUrl('');
    }
  }

  changeState(state: boolean): void {
    this.isLoginState = state;
  }

  logIn(): void {
    this.service.login(this.formlogin.getRawValue())
    .subscribe(res => {
      this.router.navigateByUrl('');
    },
    error => {
      console.error("Login Error", error)
      this.errorMessage = error.error;
    });
  }

  signUp(): void {
    this.service.register(this.formregister.getRawValue())
    .subscribe(res => {
      this.router.navigateByUrl('');
    },
    error => {
      console.error("Register Error", error)
      this.errorMessage = error.error;
    });
  }
}
