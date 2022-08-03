import { Injectable } from '@angular/core';
import { AlertService } from './sweetAlert.service';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class ErrorHandlerService {
  constructor(
    private _alert: AlertService,
    private router: Router,
    private _sharedService: SharedService
  ) { }

  handleError(error: any): any {
    let title = '';
    let subTitle = '';
    const purgeCodes = ['AUTHORIZATION_REQUIRED', 'INVALID_TOKEN'];
    if (error) {
      if (error.errorCode && purgeCodes.includes(error.errorCode)) {
        this._sharedService.purgAuth();
        this._alert.showErrorAlert('Sorry!', error.message);
        this.router.navigate(['/']);
        return;
      }
      else {
        title = error.name || "Oops!";
        subTitle = error.message || ' Sorry! Something Went Wrong!';
      }
    } else {
      title = `Server Issue!`;
      subTitle = `Server is not responding, Please try again later.`;
    }
    this._alert.showErrorAlert(title, subTitle);
  }
}
