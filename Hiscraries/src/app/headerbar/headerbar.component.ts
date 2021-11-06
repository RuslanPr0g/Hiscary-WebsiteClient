import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsharedService } from '../testshared.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {
  searchBarValue = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private service: TestsharedService, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.isAuthenticated();
    this.searchBarValue = this.route.snapshot.params['query'];
  }

  redirectToSearchPage(event: any): void {
    let searchRequest = event.target.value.trim();

    if (searchRequest != '')
      this.router.navigateByUrl('story/search/' + searchRequest);
  }
}
