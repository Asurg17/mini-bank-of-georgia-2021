import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthorizationService } from './authorization.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthorizationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                if(!user){
                    return this.router.createUrlTree(['/auth']);
                }
                return !!user;
            })
        );
    }

}
