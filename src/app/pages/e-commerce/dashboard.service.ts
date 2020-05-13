import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoginService } from 'src/app/security/login/login.service';


@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private router: Router, private serviceLogin : LoginService) {}

  getUnidadesProvider(
    initDate: string,
    endDate: string
  ): Observable<any> {
    return this.http.get(
      environment.api +
        `biprojetos/v1/unidadesprovider/poridgestor/${this.serviceLogin.user.id}/${initDate}/${endDate}`
    );
  }

  getClientes(unity : string) : Observable<any> {
    return this.http.get(environment.api  + `biprojetos/v1/clientes/dogestor/${this.serviceLogin.user.id}/doperiodo/202002/daunidade/${unity}`)
  }
}
