import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthResponseModel } from "src/app/auth/auth-response.model";
import { LoaderService } from "../loader/loader.service";
import { UserModel } from "../user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService{

    user: Subject<UserModel> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private loader: LoaderService) {}

    handleAuthorization = ((authResponse: AuthResponseModel) => {
        this.user.next(new UserModel(
            authResponse.name, 
            authResponse.username, 
            authResponse.image, 
            authResponse.token, 
            new Date(authResponse.expirationDate)));
    });

    register(name: string, username: string, password: string){
        return this.http.post<AuthResponseModel>('register', {
            name, username, password
        }).pipe(
            this.loader.useLoader,
            catchError(err => throwError(err.error)),
            tap(this.handleAuthorization)
        );
    }

    login(username: string, password: string){
        return this.http.post<AuthResponseModel>('login', {
            username, password
        }).pipe(
            this.loader.useLoader,
            catchError(err => throwError(err.error)),
            tap(this.handleAuthorization)
        );
    }

    logout(){
        this.user.next(null);
    }
}
