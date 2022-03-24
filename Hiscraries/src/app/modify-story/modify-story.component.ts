import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';
import { Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-modify-story',
  templateUrl: './modify-story.component.html',
  styleUrls: ['./modify-story.component.css']
})
export class ModifyStoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: TestsharedService,
    private route: ActivatedRoute, private router: Router) {
    this.modifystory = this.formBuilder.group({
      storyId: '',
      title: '',
      description: '',
      authorname: '',
      genreId: '',
      agelimit: '',
      datewritten: new Date()
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '45rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  StoryId: number = 0;
  Story: any = {};
  errorMessage: string = "";
  IsError: boolean = false;
  IsLoading: boolean = true;

  modifystory: FormGroup;
  htmlContent: string = "";
  pages: Array<string> = [""];
  CurrentPage: number = 0;

  CurrentUser: any;

  ngOnInit(): void {
    if (this.service.isAuthenticated() == false) {
      this.router.navigateByUrl('login');
    }

    let id = this.route.snapshot.params['id'];
    this.StoryId = id;

    this.setUser();
    this.getStory(id);
    this.getStoryPages(id);
  }

  setUser(): void {
    this.service.getUserInfo()
      .subscribe(res => {
        this.CurrentUser = res;
      },
        error => {
        });
  }

  getStoryPages(id: number): void {
    this.service.getPagesForStory({ id }).subscribe(data => {
      this.pages = data.map((cpage: any) => {
        return cpage.content;
      });

      let isError = this.pages == null || this.Story == undefined ? true : false;

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }
      else {
        this.htmlContent = this.pages[this.CurrentPage];
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    })
  }

  getStory(id: number): any {
    this.service.getStoryById({ id }).subscribe(data => {
      this.Story = data[0];

      this.modifystory = this.formBuilder.group({
        title: this.Story.title,
        description: this.Story.description,
        authorname: this.Story.authorName,
        genreid: this.Story.genre.id,
        agelimit: this.Story.ageLimit,
        datewritten: this.Story.dateWritten
      })

      let isError = this.Story == null || this.Story == undefined ? true : false;

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }

      setTimeout(() => {
        if (this.CurrentUser.id != this.Story.publisher.id) {
          this.router.navigateByUrl('');
        }

        this.IsLoading = false;
      }, 1000);
    })
  }

  modifyStoryInfo(): void {
    let storyMod = this.modifystory.getRawValue();
    storyMod["storyId"] = this.StoryId;
    this.service.updateStoryInfo(storyMod).subscribe(
      data => {
        this.router.navigateByUrl('story/info/' + this.StoryId);
      },
      error => {
        console.log(error)
        this.IsError = true;
        this.errorMessage = error.error;
      });
  }

  nextPage(): void {
    if (this.htmlContent != "") {
      this.pages[this.CurrentPage] = this.htmlContent;
      this.htmlContent = "";

      if (this.pages[this.CurrentPage + 1] != "" &&
        this.pages[this.CurrentPage + 1] != undefined) {
        this.htmlContent = this.pages[this.CurrentPage + 1];
      }
      else {
        this.pages.push("");
      }

      this.CurrentPage++;
    }
  }

  prevPage(): void {
    if (this.htmlContent != "") {
      this.pages[this.CurrentPage] = this.htmlContent;
    }

    if (this.CurrentPage - 1 >= 0) {
      if (this.pages[this.CurrentPage] == "") {
        this.pages.pop();
      }

      this.CurrentPage--;

      this.htmlContent = this.pages[this.CurrentPage];
    }
  }

  removePage(): void {
    if (this.pages.length <= 1) {
      this.htmlContent = "";
    }
    else {
      this.pages.splice(this.CurrentPage, 1)

      this.CurrentPage = 0;
      this.htmlContent = this.pages[this.CurrentPage];
    }
  }

  publishPages(): void {
    if (this.htmlContent != "") {
      this.pages[this.CurrentPage] = this.htmlContent;
    }

    let storyPages = {
      storyId: this.StoryId,
      content: this.pages
    }

    this.service.updateStoryPages(storyPages).subscribe(
      data => {

      },
      error => {
        console.log(error)
        this.IsError = true;
        this.errorMessage = error.error;
      });
  }

  cancel(): void {
    this.router.navigateByUrl('');
  }
}
