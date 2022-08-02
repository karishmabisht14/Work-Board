import { SharedService } from 'src/core/providers/services/shared.service';
import { ApiService } from 'src/core/providers/services/api.service';
import { ApiEndPoints } from 'src/core/providers/constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class UserApiService {
  constructor(
    private _sharedService: SharedService,
    private _apiService: ApiService
  ) {}

  updateUserDetails(payload: any, userId: number): Observable<any> {
    return this._apiService
      .patch(`${ApiEndPoints.signUp}/${userId}`, payload)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  refreshUserData(userId: number, self: boolean = false) {
    let filter =
      '?filter[include]=clientSettings&filter[include]=clientSocialLinks&filter[include]=attachments&filter[include]=portfolios';
    return this._apiService
      .get(`${ApiEndPoints.signUp}/${userId}${filter}`)
      .pipe(
        map((data) => {
          if (data && self) {
            this._sharedService.changeUser(data);
          }
          return data;
        })
      );
  }
}
