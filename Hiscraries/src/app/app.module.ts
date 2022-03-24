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
import { SearchResultsComponent } from './search-results/search-results.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LogoutComponent } from './logout/logout.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoStoryComponent } from './story/info-story/info-story.component';
import { PublishComponent } from './publish/publish.component';
import { ModifyStoryComponent } from './modify-story/modify-story.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

export function tokenGetter() {
  return localStorage.getItem(environment.ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ShowStoryComponent,
    AddEditStoryComponent,
    HomeComponent,
    LoginComponent,
    ReadStoryComponent,
    SearchResultsComponent,
    LogoutComponent,
    HeaderbarComponent,
    ProfileComponent,
    InfoStoryComponent,
    PublishComponent,
    ModifyStoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'publish', component: PublishComponent },
      { path: 'modifystory/:id', component: ModifyStoryComponent },
      { path: 'story/info/:id', component: InfoStoryComponent },
      { path: 'story/read/:id', component: ReadStoryComponent },
      { path: 'story/search/:query', component: SearchResultsComponent },
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [TestsharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
