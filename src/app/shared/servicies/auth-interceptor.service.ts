import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthorizationService) {}

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.user
        .pipe(
            take(1),
            switchMap(user => {
                if(!user?.token){
                    return handler.handle(request);
                }
                const modifiedRequest = request.clone({
                    headers: request.headers.append('Authorization', 'Bearer ' + user.token),
                    url: 'https://bog-angular-course-api.herokuapp.com/' + request.url
                });
                console.log(modifiedRequest);
                return handler.handle(modifiedRequest);
            }) 
        );
    }  
}
