import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import Story from '../models/Story';

@Injectable({
  providedIn: 'root'
})
export class TestsharedService {
readonly APIUrl = "https://localhost:5001/api";

  constructor(private http:HttpClient) {

   }

   getStoryList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl + "/story");
   }

   // EXTRACT TO DTO MODEL
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

   // EXTRACT TO DTO MODEL
   // "storyId": 0,
   // "content": "string"
   addStoryPage(val: any) {
    return this.http.post(this.APIUrl + "/story/page", val);
   }

   // OTHER LOGIC...
}
