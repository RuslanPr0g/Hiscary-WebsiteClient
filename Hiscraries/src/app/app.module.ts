import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { ShowStoryComponent } from './story/show-story/show-story.component';
import { AddEditStoryComponent } from './story/add-edit-story/add-edit-story.component';
import { TestsharedService } from './testshared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReadStoryComponent } from './story/read-story/read-story.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ShowStoryComponent,
    AddEditStoryComponent,
    HomeComponent,
    LoginComponent,
    ReadStoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'story/read/:id', component: ReadStoryComponent }
    ])
  ],
  providers: [TestsharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
