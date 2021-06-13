import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AuthResponseModel } from "src/app/auth/auth-response.model";
import { LoaderService } from "../loader/loader.service";
import { UserModel } from "../models/user.model";
import { AuthorizedService } from "./authorized.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService{

    user = new BehaviorSubject<UserModel>(null);

    timeout: any;

    constructor(private http: HttpClient, private loader: LoaderService, 
                private router: Router, private authorizedService: AuthorizedService) {}

    handleAuthorization = (authResponse: AuthResponseModel) => {
        const user = new UserModel(
            authResponse.name, 
            authResponse.username, 
            authResponse.image, 
            authResponse.token, 
            new Date(authResponse.expirationDate)
        );
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(new Date(authResponse.expirationDate));
    };

    register(name: string, username: string, password: string) {
        return this.http.post<AuthResponseModel>('https://bog-angular-course-api.herokuapp.com/register', {
            name, username, password
        }).pipe(
            this.loader.useLoader,
            catchError(err => throwError(err.error)),
            tap(this.handleAuthorization)
        );
    }

    login(username: string, password: string) {
        return this.http.post<AuthResponseModel>('https://bog-angular-course-api.herokuapp.com/login', {
            username, password
        }).pipe(
            this.loader.useLoader,
            catchError(err => throwError(err.error)),
            tap(this.handleAuthorization)
        );
    }

    autoLogin() {
        const userInfo = JSON.parse(localStorage.getItem('user'));

        if (!userInfo) return;
        
        const user = new UserModel(
            userInfo.name,
            userInfo.username,
            userInfo.image,
            userInfo._token,
            new Date(userInfo._expirationDate)
        );

        if (!user.token) {
            localStorage.removeItem('user');
            return;
        }

        this.user.next(user);
        this.autoLogout(new Date(userInfo._expirationDate));
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('user');
        this.authorizedService.removeClient();
        this.router.navigate(['/auth']);
        clearTimeout(this.timeout);
    }

    autoLogout(logoutTime: Date) {
        this.timeout = setTimeout(() => this.logout(), Math.min((logoutTime.getTime() - new Date().getTime()), 2147483647));
    }
}
