import { Component, OnInit } from '@angular/core';
import {News, NewsService} from '../news.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news$: Observable<News[]>
  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.news$ = this._newsService.getNews();
  }

  deleteNews(id: string) {
    this._newsService.deleteNews(id);
  }

}
