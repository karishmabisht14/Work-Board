import { Injectable } from '@angular/core';
import { SharedService } from 'src/core/providers/services/shared.service';
import { ApiService } from 'src/core/providers/services/api.service';
import { ApiEndPoints } from 'src/core/providers/constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class LoginService {
  constructor(
    private _sharedService: SharedService,
    private _apiService: ApiService
  ) {}

  login(payload: any): Observable<any> {
    // console.log("here.........login....", payload);
    return this._apiService.post(ApiEndPoints.login, payload).pipe(
      map(data => {
        // console.log("here.........login....", data);
        if (data && data.user) {
          this._sharedService.setItem('auth-token', data.id);
          this._sharedService.setItem('userId', data.user.id);
          this._sharedService.changeUser(data.user);
        }
        return data;
      })
    );
  }

  logout() {
    return this._apiService.post(ApiEndPoints.logout).pipe(
      map(data => {
        this._sharedService.purgAuth();
        this._sharedService.changeUser({});
        return data;
      })
    );
  }
}