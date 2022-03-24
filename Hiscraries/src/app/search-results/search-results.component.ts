import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from '../testshared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private service: TestsharedService, private route: ActivatedRoute, private router: Router) { }

  StoryList: any = []
  SearchQuery: string | null = "";
  IsLoading: boolean = true;

  ngOnInit(): void {
    let search = this.route.snapshot.queryParamMap.get('s');
    let genre = this.route.snapshot.queryParamMap.get('g');

    this.SearchQuery = search;

    if (!search && !genre)
    {
      this.router.navigateByUrl('');
    }

    this.searchByQuery(search, genre);
  }

  searchByQuery(search: string | null, genre: string | null): any {
    this.service.search({ search, genre }).subscribe(data => {
      this.StoryList = data;
    });

    setTimeout(() => {
      this.IsLoading = false;
    }, 2000);
  }
}
