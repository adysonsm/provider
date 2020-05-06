import { CanLoad, Route, ActivatedRoute, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad{
    constructor(private service : LoginService){}
    checkAuthentication():boolean {
        if (!this.service.isLoggedIn()) {
            this.service.handleLogin();
        }
        return this.service.isLoggedIn();
    }
    canLoad(route: Route): boolean {
       return this.checkAuthentication();
    }

}