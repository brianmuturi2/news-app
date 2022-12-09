import { Component, OnInit } from '@angular/core';
import {News, NewsService} from '../news.service';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  loading: Observable<boolean>;
  news$: Observable<News[]>
  constructor(private _newsService: NewsService,
              private _toastController: ToastController) { }

  ngOnInit() {
    this.getNews();
    this.loading = this._newsService.isLoading;
  }

  getNews() {
    this.news$ = this._newsService.getNews();
  }

  deleteNews(id: number) {
    this._newsService.deleteNews(id).subscribe(res => {
      this.getNews();
    }, err => {
        this.showError();
    });
  }

  async showError() {
    const toast = await this._toastController.create({
      message: 'Could not delete news!',
      duration: 1500,
      position: 'middle'
    });

    await toast.present();
  }

}
