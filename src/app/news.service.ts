import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, delay} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {map} from 'rxjs/operators';

export interface News {
  id?: string;
  image: string;
  title: string;
  date: Date | string;
  description: string;
}

export interface NewsResponse {
  [key: string]: News
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public isLoading = new BehaviorSubject(false);

  firebaseUrl = 'https://homework-9a4c1-default-rtdb.firebaseio.com/users';
  constructor(private _http: HttpClient,
              private _toastController: ToastController) { }

  addNews(payload: News) {
    return this._http.post(`${this.firebaseUrl}.json`, payload);
  }

  /* Format news from firebase object structure to array for ease of looping in template and deleting an item*/
  getNews() {
    return this._http.get<NewsResponse>(`${this.firebaseUrl}.json`).pipe(map(res => Object.entries(res)));
  }

  deleteNews(id: string) {
    return this._http.delete(`${this.firebaseUrl}/${id}.json`);
  }

  async showError() {
    const toast = await this._toastController.create({
      message: 'Could not complete request!',
      duration: 1500,
      position: 'middle'
    });

    await toast.present();
  }
}
