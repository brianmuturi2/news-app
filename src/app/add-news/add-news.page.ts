import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage implements OnInit {

  newsForm: FormGroup;
  showSelectDate: boolean;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newsForm = this._formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addNews(){

  }


}
