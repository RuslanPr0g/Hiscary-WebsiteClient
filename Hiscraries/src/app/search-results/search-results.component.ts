import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from '../testshared.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private service: TestsharedService, private route: ActivatedRoute) { }

  StoryList: any = []
  SearchQuery: string = "";
  IsLoading: boolean = true;

  ngOnInit(): void {
    let query = this.route.snapshot.params['query'];
    this.SearchQuery = query;
    this.searchByQuery(query);
  }

  searchByQuery(query: string): any {
    this.service.search({ query }).subscribe(data => {
      this.StoryList = data;
    });

    setTimeout(() => {
      this.IsLoading = false;
    }, 2000);
  }
}
