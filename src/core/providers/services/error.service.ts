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
    console.log('error....is', typeof (error.error));
    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.log('Client Side-------------------');
      title = `Error: ${error.error.message}`;
    } else if (typeof (error.error) === 'string') {
      title = `Oops...!`;
      subTitle = error.error;
    } else {
      // server-side error
      let err = this.getErrorMsgAndCode(error);
      console.log('Server Side-------------------', err);
      if (error.status === 0) {
        title = `Server Issue!`;
        subTitle = `Server is not responding, Please try again later.`;
      } else if (
        err &&
        (err.code === 'AUTHORIZATION_REQUIRED' || err.code === 'INVALID_TOKEN')
      ) {
        this._sharedService.purgAuth();
        console.log('here we are------------------', err);
        this._alert.showErrorAlert('Sorry!', err.message);
        this.router.navigate(['/']);
        return;
      } else {
        title = `Oops...!`;
        subTitle = err ? err.message : '';
      }
    }
    console.log('..here..._alert....');
    this._alert.showErrorAlert(title, subTitle);
  }

  getErrorMsgAndCode(error: any): any {
    console.log('...getErrorMsg...', error.error.error);
    try {
      return {
        code: error.error.error.code,
        message: error.error.error.message,
      };
    } catch (error) {
      this._alert.showErrorAlert(
        'Server is not reachable!',
        'Please Try again later.'
      );
    }
  }
}
