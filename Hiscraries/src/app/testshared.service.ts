import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Story from '../models/Story';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TestsharedService {
  readonly APIUrl = "https://localhost:5001/api";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  // { headers: {"Authorization": "Bearer " + localStorage.getItem(environment.ACCESS_TOKEN_KEY)} }
  getStoryList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + "/story");
  }

  // "publisherId": 0,
  // "title": "string",
  // "description": "string",
  // "authorName": "string",
  // "genreId": 0,
  // "ageLimit": 0,
  // "dateWritten": "2021-10-26T19:15:21.407Z"
  addStory(val: any) {
    return this.http.post(this.APIUrl + "/story", val);
  }

  // "storyId": 0,
  // "content": "string"
  addStoryPage(val: any) {
    return this.http.post(this.APIUrl + "/story/page", val);
  }

  //   "username": "string",
  //   "password": "string"
  login(val: any) {
    return this.http.post(this.APIUrl + "/user/login", val)
      .pipe(
        tap((tokenData: any) => {
          localStorage.setItem(environment.ACCESS_TOKEN_KEY, tokenData.token);
          localStorage.setItem(environment.REFRESH_TOKEN_KEY, tokenData.refreshToken);
        })
      );
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(environment.ACCESS_TOKEN_KEY);
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logOut(): void {
    localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
    localStorage.removeItem(environment.REFRESH_TOKEN_KEY);
  }

  //   "username": "string",
  //   "email": "string",
  //   "birthDate": "2021-11-02T16:19:14.548Z",
  //   "password": "string"
  register(val: any) {
    return this.http.post(this.APIUrl + "/user/register", {
      username: val.username,
      email: val.email,
      birthDate: val.dob,
      password: val.password
    })
    .pipe(
      tap((tokenData: any) => {
        localStorage.setItem(environment.ACCESS_TOKEN_KEY, tokenData.token);
        localStorage.setItem(environment.REFRESH_TOKEN_KEY, tokenData.refreshToken);
      })
    );
  }

  getPagesForStory(val: any) {
    return this.http.get<any>(this.APIUrl + "/story/page/" + val.id);
  }

  search(val: any) {
    return this.http.get<any>(this.APIUrl + "/story?search=" + val.query);
  }
}
