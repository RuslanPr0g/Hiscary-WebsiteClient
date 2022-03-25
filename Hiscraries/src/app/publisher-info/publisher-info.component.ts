import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publisher-info',
  templateUrl: './publisher-info.component.html',
  styleUrls: ['./publisher-info.component.css']
})
export class PublisherInfoComponent implements OnInit {

  constructor(private service: TestsharedService, 
    private route: ActivatedRoute, private router: Router) { }

    User: any = {};
    Username: string = '';
    IsError: boolean = false;
    IsLoading: boolean = true;
    errorMessage: string = '';

  StoryList: any = []

  ngOnInit(): void {
    this.Username = this.route.snapshot.params['id'];
    this.getUserInfo();
    this.refreshStoryList();
  }

  getUserInfo(): any {
    this.service.getUserInfoUsername(this.Username).subscribe(data => {
        this.User = data;

        setTimeout(() => {
          this.IsLoading = false;
        }, 1000);
    })
  }

  refreshStoryList() {
    this.service.getStoryList().subscribe(data => {
      this.StoryList = data.filter(item => item.publisher.id == this.User.id).reverse();

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    })
  }
}
