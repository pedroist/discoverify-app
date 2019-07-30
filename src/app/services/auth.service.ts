import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ACTION_LOGOUT } from '../store/actions/authActions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedInReference = this.isLoggedInSource.asObservable();

  constructor(private store: Store<any>) { }

  login() {
    window.location.href = 'http://localhost:8888/login';
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Logged out");

    //notify other components subscribed to isLoggedInReference that is now logged out
    /* OPTION 1 - Subject 
    this.isLoggedInSource.next(false);
    */

    /* OPTION 2 - REDUX */
    this.store.dispatch({
      type: ACTION_LOGOUT
    })
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

  /* OPTION 1 - Subject */
  setIsLoggedInReference(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }

  getIsLoggedInReference(): Observable<boolean> {
    return this.isLoggedInReference;
  }

  /* OPTION 2 - Redux */
  getAuthState() {
    return this.store.select('authReducer'); //'authReducer' defined in reducers/index
  }

  updateState({ action }) {
    this.store.dispatch({
      type: action
    })
  }
}
