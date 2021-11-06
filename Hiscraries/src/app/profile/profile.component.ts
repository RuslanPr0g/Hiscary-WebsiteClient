import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsharedService } from '../testshared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: TestsharedService, private router: Router) {
    this.formuserdata = this.formBuilder.group({
      email: '',
      dob: ''
    })

    this.formupdatepassword = this.formBuilder.group({
      oldPassword: '',
      newPassword: '',
    })
  }

  formuserdata: FormGroup;
  formupdatepassword: FormGroup;

  User: any = {};
  IsError: boolean = false;
  IsLoading: boolean = true;
  errorMessage: string = '';

  ngOnInit(): void {
    if (this.service.isAuthenticated() === false) {
      this.router.navigateByUrl('login');
    }

    this.getUserInfo();
  }

  getUserInfo(): any {
    this.service.getUserInfo().subscribe(data => {
      this.User = data;
      let isError = this.User == null || this.User == undefined ? true : false;

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 2000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 2000);
    })
  }

  updatePassword(): void {
    this.service.updateUsersData({
      previousPassword: this.formupdatepassword.getRawValue().oldPassword,
      newPassword: this.formupdatepassword.getRawValue().newPassword
    }).subscribe(
      data => {
        this.router.navigateByUrl('logout');
      },
      error => {
        console.log(error)
        this.errorMessage = error.error;
      });
  }

  updateUserData(): void {
    this.service.updateUsersData({
      email: this.formuserdata.getRawValue().email,
      birthDate: this.formuserdata.getRawValue().dob
    }).subscribe(
      data => {
        this.getUserInfo();
        console.log(data)
      },
      error => {
        console.log(error)
        this.errorMessage = error.error;
      });
  }
}
