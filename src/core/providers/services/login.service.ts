import { Injectable } from '@angular/core';
import { SharedService } from 'src/core/providers/services/shared.service';
import { ApiService } from 'src/core/providers/services/api.service';
import { ApiEndPoints } from 'src/core/providers/constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { BoardCategoryService } from './boardCategory.service';
@Injectable()
export class LoginService {
  constructor(
    private _sharedService: SharedService,
    private _apiService: ApiService,
    private router: Router,
  ) { }

  login(payload: any): Observable<any> {
    return this._apiService.post(ApiEndPoints.login, payload).pipe(
      map(userDetails => {
        if (userDetails && userDetails._id) {
          this._sharedService.setItem('auth-token', userDetails.token);
          this._sharedService.changeUser(userDetails);
          this.router.navigate(['category']);
        }
        return userDetails;
      })
    );
  }

  signUp(payload: any): Observable<any> {
    return this._apiService.post(ApiEndPoints.signUp, payload).pipe(
      map(userDetails => {
        if (userDetails && userDetails._id) {
          this._sharedService.setItem('auth-token', userDetails.token);
          this._sharedService.changeUser(userDetails);
        }
        return userDetails;
      })
    );
  }

  logout(): Observable<any> {
    return this._apiService.post(ApiEndPoints.logout).pipe(
      map(data => {
        this._sharedService.purgAuth();
        this._sharedService.changeUser({});
        return data;
      })
    );
  }
}