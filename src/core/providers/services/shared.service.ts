import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentUser = this.user.asObservable();
  isLoggedIn: Boolean = false;
  redirectUrl: string = '';
  constructor() { }

  changeUser(user: any) {
    if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    this.user.next(user);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(item: string) {
    return localStorage.getItem(item);
  }

  removeItem(item: string) {
    localStorage.removeItem(item);
  }

  purgAuth() {
    localStorage.clear();
  }

  groupBy(arr: any[], key: string) {
    const myObj: any = {};
    arr.forEach(ele => {
      if (myObj[ele[key]] && myObj[ele[key]].count) {
        myObj[ele[key]].count = myObj[ele[key]].count + 1;
        myObj[ele[key]].items.push(ele);
      } else {
        myObj[ele[key]] = {
          expand: false,
          selected: false,
          count: 1,
          items: [ele]
        };
      }
    });
    return myObj;
  }
}
