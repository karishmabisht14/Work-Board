import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { retryWhen, concatMap, delay, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../providers/services/error.service';
import { SharedService } from '../providers/services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _errorHandler: ErrorHandlerService,
    private _sharedService: SharedService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._sharedService.getItem('auth-token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("HttpResponse--->>>", event);
        }
        return event;
      }),
      retryWhen((errors) =>
        errors.pipe(
          concatMap((error, count) => {
            if (count < 0 && (error.status == 500 || error.status == 0)) {
              return of(error.status);
            }
            const errorData = error.error || error;
            this._errorHandler.handleError(errorData);
            return throwError(error);
          }),
          delay(1500)
        )
      )
    );
  }
}
