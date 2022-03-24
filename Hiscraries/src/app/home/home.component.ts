import { Component, OnInit } from '@angular/core';
import { TestsharedService } from 'src/app/testshared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: TestsharedService, private router: Router) { }

  GenreList: any = [];

  ngOnInit(): void {
    this.setGenres();
  }

  setGenres(): void {
    this.service.getGenres().subscribe(data => {
      this.GenreList = data.reverse();
    })
  }
}
