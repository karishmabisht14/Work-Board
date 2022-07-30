import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    console.log('data------------', data);
    return this.http.post(`${environment.api_url}` + '/user/login', data);
  }

  register(data: any) {
    console.log('data------------', data);
    return this.http.post(`${environment.api_url}` + '/user/register', data);
  }

  logout() {
    return this.http.post(`${environment.api_url}` + '/user/logout', '');
  }

  changePassword(data: any) {
    console.log('Data===========', data);
    return this.http.post(
      `${environment.api_url}` + '/user/change-password',
      data
    );
  }

  forgotPassword(data: any): any {
    return this.http.post(`${environment.api_url}` + '/user/reset', data);
  }
}
