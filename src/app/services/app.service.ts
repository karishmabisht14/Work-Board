import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  boardsData: any = [];
  constructor(private http: HttpClient) {}
  public getJsonData(): Observable<any> {
    return this.http.get('./assets/data/boards.json');
  }

  public setBoardsData(data: any = []) {
    this.boardsData = data;
  }

  public getBoardsData() {
    return this.boardsData;
  }
}
