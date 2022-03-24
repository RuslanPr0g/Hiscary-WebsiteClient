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
  StoryId: number = -1;

  constructor(private service: TestsharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.StoryId = this.route.snapshot.params['id'];
    this.getPages(this.StoryId);
    this.readPage(this.StoryId, 1);
  }

  readPage(storyId: number, pageRead: number) {
    this.service.readStoryHistory({ storyId, pageRead }).subscribe(data => {
      let isError = !data;

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

  NextPage() {
    if (this.CurrentPage < this.Pages.length - 1)
    {
      this.CurrentPage += 1;
      this.readPage(this.StoryId, this.CurrentPage + 1);
    }
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
