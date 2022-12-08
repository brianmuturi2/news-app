import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  dummyUrl = '/assets/dummy.json';
  constructor(private _http: HttpClient) { }

  getNews() {
    return this._http.get<News[]>(this.dummyUrl);
  }

  deleteNews(id: string) {
    return this._http.delete(`${this.dummyUrl}/${id}`);
  }
}
