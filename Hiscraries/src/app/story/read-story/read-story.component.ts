import { compileInjectable } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';

@Component({
  selector: 'app-read-story',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.css']
})
export class ReadStoryComponent implements OnInit {
  Pages: any = []
  CurrentPage: number = 0;
  IsError: boolean = false;
  IsLoading: boolean = true;

  constructor(private service: TestsharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getPages(id);
  }

  NextPage() {
    if (this.CurrentPage < this.Pages.length - 1)
      this.CurrentPage += 1;
  }

  PrevPage() {
    if (this.CurrentPage > 0)
      this.CurrentPage -= 1;
  }

  getPages(id: any) {
    this.service.getPagesForStory({ id }).subscribe(data => {
      this.Pages = data;
      let isError = data.length === 0 ? true : false;

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
}
