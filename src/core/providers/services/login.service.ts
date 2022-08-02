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
  ) { }

  login(payload: any): Observable<any> {
    console.log("here.........login....", payload, ApiEndPoints.login);
    return this._apiService.post(ApiEndPoints.login, payload).pipe(
      map(userDetails => {
        console.log("here.........login....", userDetails);
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