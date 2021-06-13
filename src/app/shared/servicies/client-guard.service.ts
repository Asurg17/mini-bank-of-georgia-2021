import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthorizedService } from './authorized.service';

@Injectable({
    providedIn: 'root'
})
export class ClientGuardService implements CanActivate{

    constructor(private authorizedService: AuthorizedService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let clientKey = this.authorizedService.getClientKey();
    
        if(!clientKey){
            return this.router.createUrlTree(['/']);
        }
        return !!clientKey;
    }

}
