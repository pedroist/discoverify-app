import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    /* OPTION 1 - Subject*/
    /*
    canActivate(): Observable<boolean> {
        return this.auth.getIsLoggedInReference().pipe(map(isLoggedIn => {
            if (!isLoggedIn) {
                this.router.navigate(['/']);
            }
            return isLoggedIn;
        }));
    }
    */

    /* OPTION 2 - Redux*/
    canActivate(): boolean {
        debugger;
        this.authService.getAuthState().subscribe(state => {
            this.isLoggedIn = state.login;
            debugger;
            if (!state.login) {
                this.router.navigate(['/']);
            }
        });
        debugger;
        return this.isLoggedIn;
    }
}