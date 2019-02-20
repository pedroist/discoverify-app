import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
  }
}
