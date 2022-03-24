import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestsharedService } from '../testshared.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  errorMessage: string = '';
  publishstory: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: TestsharedService, private router: Router) {
    this.publishstory = this.formBuilder.group({
      title: '',
      description: '',
      authorname: '',
      genreid: '',
      agelimit: '',
      datewritten: new Date()
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
   }

  ngOnInit(): void {
    if (this.service.isAuthenticated() == false)
    {
      this.router.navigateByUrl('login');
    }
  }

  publishStory(): void {
    this.service.addStory(this.publishstory.getRawValue())
    .subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('modifystory/' + res);
    },
    error => {
      console.error("Publish Error", error)
      this.errorMessage = error.error;
    });
  }

  cancel(): void
  {
    this.router.navigateByUrl('');
  }
}
