import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {NewsService} from './news.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor{

    constructor(private _newsService: NewsService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._newsService.isLoading.next(true);
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                this._newsService.isLoading.next(false);
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this._newsService.isLoading.next(false);
                this._newsService.showError();
                return throwError(error);
            })
        )
    }

}
