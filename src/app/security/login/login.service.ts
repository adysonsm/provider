import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class LoginService {
    user : any;
    constructor(private http:HttpClient, private router: Router) {}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }
    login(email:string, password:string): Observable<any> {
        return this.http.post('', {email: email, password: password} )
    }

    handleLogin(){
        this.router.navigate(['/login'])
    }

    logout() {
        this.user = undefined;
        this.handleLogin();
    }

}