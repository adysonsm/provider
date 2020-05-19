import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoginService } from "src/app/security/login/login.service";
import { Manager } from "../model/manager.model";

@Injectable()
export class ManagerService {
  manager: Manager;
  public idUser = this.serviceLogin.user.id;
  constructor(private http: HttpClient, private serviceLogin: LoginService) {}

  listManager(cnpj : string) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/gestores/listagestores/${this.idUser}/cnpj/${cnpj}`
    );
  }
  updateManager(params: any) {
    return this.http.put(environment.api + `biprojetos/v1/gestores`, params);
  }
  creatManager(params: any) {
    return this.http.post(environment.api + `biprojetos/v1/gestores`, params);
  }
  deleteManager(email: string) {
    return this.http.delete(
      environment.api + `biprojetos/v1/gestores/${email}/${this.idUser}`
    );
  }
}
