import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ACTION_LOGIN, ACTION_LOGOUT } from 'src/app/store/actions/authActions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.extractToken();
    /* OPTION 1 - Subject */
    /*
    this.authService.setIsLoggedInReference(this.authService.isLoggedIn());

    this.authService.isLoggedInReference.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        console.log("Not logged in")
      } else {
        console.log("Logged in")
        //TODO: Redirect to Home page (without the access_token on URL);
        this.router.navigate(['/']);
      }
    });
    */

    /* OPTION 2 - Redux */
    this.authService.updateState({
      action: this.authService.isLoggedIn() ? ACTION_LOGIN : ACTION_LOGOUT
    });

    this.authService.getAuthState().subscribe(state => {
      if (!state.login) {
        console.log("Not logged in")
      } else {
        console.log("Logged in")
        //TODO: Redirect to Home page (without the access_token on URL);
        this.router.navigate(['/']);
      }
    })
  }
}
