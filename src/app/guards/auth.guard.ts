import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate(): Observable<boolean> {
        return this.auth.getIsLoggedInReference().pipe(map(isLoggedIn => {
            if (!isLoggedIn) {
                this.router.navigate(['/']);
            }
            return isLoggedIn;
        }));
    }
}