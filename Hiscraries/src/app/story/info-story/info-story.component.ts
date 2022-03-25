import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-story',
  templateUrl: './info-story.component.html',
  styleUrls: ['./info-story.component.css']
})
export class InfoStoryComponent implements OnInit {

  constructor(private service: TestsharedService, 
    private route: ActivatedRoute, private router: Router) { }

  Story: any = {};
  IsError: boolean = false;
  IsLoading: boolean = true;

  CommentList: any[] = [''];

  CurrentComment: string = '';

  User: any = {};

  ngOnInit(): void {
    if (this.service.isAuthenticated() == false)
    {
      this.router.navigateByUrl('login');
    }

    let id = this.route.snapshot.params['id'];
    this.getStory(id);
    this.getUserInfo();
  }

  getUserInfo(): any {
    this.service.getUserInfo().subscribe(data => {
      this.User = data;
      let isError = this.User == null || this.User == undefined ? true : false;

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    })
  }

  writeComment() {
    this.service.writeComment({ storyId: this.Story.id, content: this.CurrentComment }).subscribe(data => {
      let isError = data == null;

      this.CurrentComment = '';
      this.refreshComments(this.Story.id);

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    })
  }

  refreshComments(id: number) {
    this.service.getComments().subscribe(data => {
      this.CommentList = data.filter((s: any) => s.storyId == id);
    })
  }

  removeComment(id: number) {
    this.service.removeComment({ id }).subscribe(data => {
      this.refreshComments(this.Story.id);
    })
  }

  getStory(id: number): any {
    this.service.getStoryById({ id }).subscribe(data => {
      this.Story = data[0];
      let isError = this.Story == null || this.Story == undefined ? true : false;

      this.refreshComments(id);

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    })
  }
}
