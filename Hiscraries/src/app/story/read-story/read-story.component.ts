import { compileInjectable } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsharedService } from 'src/app/testshared.service';
import { Howl } from 'howler';

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
  StoryId: any = -1;

  AudioArray: any = [];
  IsAudioExist: boolean = false;
  IsAudioPlaying: boolean = false;
  sound: Howl | null = null;

  constructor(private service: TestsharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.StoryId = this.route.snapshot.params['id'];
    this.getPages(this.StoryId);
    this.readPage(this.StoryId, 1);
    this.getAudio(this.StoryId);
    this.sound = new Howl({
      src: [""],
      format: "mp3"
    });
  }

  playStopAudio() {
    if (this.IsAudioPlaying) {
      this.sound?.pause();
      this.IsAudioPlaying = false;
    } else {
      this.sound?.play();
      this.IsAudioPlaying = true;
    }
  }

  fullStopAudio()
  {
    this.sound?.stop();
    this.IsAudioPlaying = false;
  }

  getAudio(storyId: any) {
    this.service.getAudio(storyId).subscribe(data => {
      let isError = !data;

      if (isError) {
        setTimeout(() => {
          this.IsAudioExist = false;
        }, 1000);
        return;
      }

      this.IsAudioExist = true;
      this.AudioArray = data[0].bytes;
      const blob = new Blob([this.AudioArray], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);

      this.sound?.unload();
      this.sound = new Howl({
        src: ['data:audio/mpeg;base64,' + this.AudioArray],
        format: "mp3",
        onend: () => {
          this.IsAudioPlaying = false;
        },
        onloaderror: (id, error) => {
          console.log('Error loading audio:', error);
          this.IsAudioExist = false;
        }
      });
    }, error => {
      this.IsAudioExist = false;
    })
  }

  readPage(storyId: any, pageRead: number) {
    this.service.readStoryHistory({ storyId, pageRead }).subscribe(data => {
      let isError = !data;

      if (isError) {
        setTimeout(() => {
          this.IsError = true;
        }, 1000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    }, error => {
      this.IsError = true;
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
        }, 1000);
      }

      setTimeout(() => {
        this.IsLoading = false;
      }, 1000);
    }, error => {
      this.IsError = true;
    })
  }
}
