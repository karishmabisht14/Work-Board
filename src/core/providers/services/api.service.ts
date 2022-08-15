import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body);
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`);
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(`${environment.api_url}${path}`, body);
  }

  postImage(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, {
      reportProgress: true
    });
  }
}