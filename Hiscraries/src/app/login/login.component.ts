import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  constructor(private formBuilder: FormBuilder, private service: TestsharedService) {
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
   }

  ngOnInit(): void {
    
  }

  changeState(state: boolean): void {
    this.isLoginState = state;
  }

  logIn(): void {
    console.log("Login: ", this.formlogin.getRawValue());
    
    this.service.login(this.formlogin.getRawValue())
    .subscribe(res => {
      console.log(res)
    });
  }

  signUp(): void {
    console.log("Signup: ", this.formregister.getRawValue());
    
    this.service.register(this.formregister.getRawValue())
    .subscribe(res => {
      console.log(res)
    });
  }
}
