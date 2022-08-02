import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { ApiEndPoints } from '../constants/api-endpoints.constants';
import { SharedService } from '../services/shared.service';

@Injectable()
export class UserDataResolver implements Resolve<any> {
  constructor(
    private _apiService: ApiService,
    private _sharedService: SharedService
  ) { }
  resolve() {
    let token = this._sharedService.getItem('auth-token');
    if (token) {
      return this._apiService.get(`${ApiEndPoints.myprofile}`).pipe(
        map(user => {
          if (user && user._id) {
            this._sharedService.changeUser(user);
          }
          return user;
        })
      );
    } else {
      return {};
    }
  }
}
