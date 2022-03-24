import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';

@Component({
  selector: 'app-info-story',
  templateUrl: './info-story.component.html',
  styleUrls: ['./info-story.component.css']
})
export class InfoStoryComponent implements OnInit {

  constructor(private service: TestsharedService, private route: ActivatedRoute) { }

  Story: any = {};
  IsError: boolean = false;
  IsLoading: boolean = true;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.getStory(id);
  }

  getStory(id: number): any {
    this.service.getStoryById({ id }).subscribe(data => {
      this.Story = data[0];
      let isError = this.Story == null || this.Story == undefined ? true : false;

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
