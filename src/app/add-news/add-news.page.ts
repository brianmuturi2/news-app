import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../news.service';
import {Platform, ToastController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage implements OnInit {

  loading: Observable<boolean>;
  newsForm: FormGroup;
  showSelectDate: boolean;

  fullScreen = false;

  constructor(private _formBuilder: FormBuilder,
              private _newsService: NewsService,
              private _router: Router,
              private _platform: Platform) { }

  ngOnInit() {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      image: ['http://dummyimage.com/234x100.png/dddddd/000000']
    });
    this.loading = this._newsService.isLoading;

    if (this._platform.width() < 960) {
      this.fullScreen = true;
    }
  }

  addNews(){
    this._newsService.addNews(this.newsForm.value).subscribe(res => {
      this._router.navigate(['/tabs/news']);
    })
  }

}
