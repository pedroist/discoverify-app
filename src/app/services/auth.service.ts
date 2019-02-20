import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedInReference = this.isLoggedInSource.asObservable();

  constructor() { }

  login() {
    window.location.href = 'http://localhost:8888/login';
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Logged out");

    //notify other components subscribed to isLoggedInReference that is now logged out
    this.isLoggedInSource.next(false);
  }

  extractToken() {
    const query = window.location.search.substring(1);
    if (query.length > 0) {
      const token = query.split('access_token=')[1];
      if (typeof token !== "undefined") {
        this.saveToken(token);
        return token;
      }
    }
    return "";
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  setIsLoggedInReference(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }
}
