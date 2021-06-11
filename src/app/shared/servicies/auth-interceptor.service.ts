import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        const requestClone = request.clone({
            headers: request.headers.append('tocken', 'intercepted token'),
            url: 'https://bog-angular-course-api.herokuapp.com/' + request.url
        });
        return handler.handle(requestClone).pipe(tap (resp => {
            console.log(resp);
        }));
    }  
}
