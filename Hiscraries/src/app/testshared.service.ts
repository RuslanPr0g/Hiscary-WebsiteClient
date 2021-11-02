import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Story from '../models/Story';

@Injectable({
  providedIn: 'root'
})
export class TestsharedService {
  readonly APIUrl = "https://localhost:5001/api";

  constructor(private http: HttpClient) {

  }

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
    return this.http.post(this.APIUrl + "/user/login", val, {withCredentials: true, headers:{
      'Access-Control-Allow-Origin': '*',
  }});
  }

  //   "username": "string",
  //   "email": "string",
  //   "birthDate": "2021-11-02T16:19:14.548Z",
  //   "password": "string"
  register(val: any) {
    return this.http.post(this.APIUrl + "/user/register", {
      username: val.username,
      email: val.username + "@gmail.com",
      birthDate: Date.now,
      password: val.password
    });
  }
}
