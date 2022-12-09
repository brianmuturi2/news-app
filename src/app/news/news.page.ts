import { Component, OnInit } from '@angular/core';
import {News, NewsService} from '../news.service';
import {Observable} from 'rxjs';
import {Platform} from '@ionic/angular';

type formattedNews = [string, News]

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  loading: Observable<boolean>;
  news$: Observable<formattedNews[]>;

  fullScreen = false;

  constructor(private _newsService: NewsService,
              private _platform: Platform) { }

  ngOnInit() {
    this.getNews();
    this.loading = this._newsService.isLoading;

    if (this._platform.width() < 960) {
      this.fullScreen = true;
    }
  }

  ionViewDidEnter() {
    this.getNews();
  }

  getNews() {
    this.news$ = this._newsService.getNews();
  }

  deleteNews(id: string) {
    this._newsService.deleteNews(id).subscribe(res => {
      this.getNews();
    });
  }

}
