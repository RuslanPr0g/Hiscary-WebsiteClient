import { Component, OnInit } from '@angular/core';
import { TestsharedService } from 'src/app/testshared.service';

@Component({
  selector: 'app-show-story',
  templateUrl: './show-story.component.html',
  styleUrls: ['./show-story.component.css']
})
export class ShowStoryComponent implements OnInit {

  constructor(private service: TestsharedService) { }

  StoryList: any = []

  ngOnInit(): void {
    this.refreshStoryList();
  }

  refreshStoryList() {
    this.service.getStoryList().subscribe(data => {
      let firstImage = data.reverse()[0].imagePreview;
      this.StoryList = data.map(s => {
        s.imagePreview = firstImage;
        return s;
      });
    })
  }
}
