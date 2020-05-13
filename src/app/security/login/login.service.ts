import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment'
import { User } from '../user-model';



@Injectable()
export class LoginService {
    user : User;
    constructor(private http:HttpClient, private router: Router) {}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }
    login(email:string, password:string): Observable<any> {
        return this.http.get(environment.api + `biprojetos/v1/users/login/${email}/${password}`)
    }

    handleLogin(){
        this.router.navigate(['/login'])
    }

    logout() {
        this.user = undefined;
        this.handleLogin();
    }

}