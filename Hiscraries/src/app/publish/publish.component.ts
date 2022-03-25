import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestsharedService } from '../testshared.service';
import { Genre } from './Genre';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  errorMessage: string = '';
  publishstory: FormGroup;

  selectedValue: number = 1;

  genres: Genre[] = [];

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

   GenreList: any = [];

  ngOnInit(): void {
    if (this.service.isAuthenticated() == false)
    {
      this.router.navigateByUrl('login');
    }

    this.setGenres();
  }

  setGenres(): void {
    this.service.getGenres().subscribe(data => {
      this.GenreList = data.reverse();

      this.GenreList.forEach((genre: any) => {
        this.genres.push({ id: genre.id, name: genre.name });
      });
    })
  }

  publishStory(): void {
    var storys = this.publishstory.getRawValue();
    storys["genreid"] = this.selectedValue;
    this.service.addStory(storys)
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
