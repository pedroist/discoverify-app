import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login() {
    window.location.href = 'http://localhost:8888/login';
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Logged out");
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

  isLoggedIn() {
    if (!localStorage.getItem('token')) {
      //TODO: verificar data validade
      console.log("Doing the loggin")
      return this.extractToken() != "" ? true : false;
    } else {
      //TODO: verificar data validade
      console.log("Already Logged in");
      return true;
    }
  }
}
