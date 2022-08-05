import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentUser = this.user.asObservable();
  private categories: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentCategories = this.categories.asObservable();
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

  changeCategories(categories: any[]) {
    this.categories.next(categories);
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
}
