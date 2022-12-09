import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

export interface News {
  id: string;
  image: string;
  title: string;
  date: Date | string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public isLoading = new BehaviorSubject(false);

  dummyUrl = '/assets/dummy.json';
  firebaseUrl = 'https://news-ce465-default-rtdb.firebaseio.com/users';
  constructor(private _http: HttpClient) { }

  getNews() {
    return this._http.get<News[]>(`${this.firebaseUrl}.json`);
  }

  deleteNews(id: number) {
    return this._http.delete(`${this.firebaseUrl}/${id}.json`);
  }
}
