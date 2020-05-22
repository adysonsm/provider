import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoginService } from "src/app/security/login/login.service";

@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceLogin: LoginService
  ) {}

  public idUser = this.serviceLogin.user.id;

  getUnidadesProvider(): Observable<any> {
    return this.http.get(
      environment.api +
        `biprojetos/v1/unidadesprovider/poridgestor/${this.idUser}`
    );
  }

  getClientes(unity: number): Observable<any> {
    return this.http.get(
      environment.api +
        `/biprojetos/v1/clientes/listaresumida/dogestor/${this.idUser}/dabase/${unity}`
    );
  }

  getProjects(unidade: number, idcliente: number) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/clientes/projetos/dogestor/${this.idUser}/dabase/${unidade}/docliente/${idcliente}`
    );
  }

  getProjectPeriod(
    idbase: number,
    idcliente: number,
    idprojeto: number,
    ano: string
  ) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/clientes/projetosultimos12meses/dogestor/${this.idUser}/dabase/${idbase}/docliente/${idcliente}/doprojeto/${idprojeto}/doano/${ano}`
    );
  }

  getProjecPeridoProfissionais(
    periodo: number,
    unidade: string,
    idcliente: number,
    idprojeto: number
  ) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/profissionaisporprojeto/dousuario/${this.idUser}/doperiodo/${periodo}/daunidade/${unidade}/docliente/${idcliente}/doprojeto/${idprojeto}`
    );
  }

  getTimeSheet(
    periodo: number,
    unidade: number,
    idcliente: number,
    idprojeto: number,
    idprofissional: number
  ) {
    return this.http.get(
      environment.api +
        `/biprojetos/v1/timesheet/dogestor/${this.idUser}/doperiodo/${periodo}/daunidade/${unidade}/docliente/${idcliente}/doprojeto/${idprojeto}/doprofissional/${idprofissional}`
    );
  }

  getGraficoProdutividePeriod(
    idCliente : number,
    idprojeto: number,
    ano: number,
    agrupadopor: string,
  ) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/graficos/graficoA/dogestor/${idCliente}/doprojeto/${idprojeto}/doano/${ano}/agrupadopor/${agrupadopor}`
    );
  }
  getProdutividadePorHorasUteis(idcliente: number, ano : string, agrupadopor: string) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/graficos/graficoB/dogestor/${this.idUser}/docliente/${idcliente}/doano/${ano}/agrupadopor/${agrupadopor}`
    );
  }
  getProfissionaisPorCliente(idclinte: number) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/profissionaisporcliente/historico/dousuario/${idclinte}`
    );

  }

  getProfissionaisPorPeriodo(idprofissional: number, idcliente:number, ano : number) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/profissionaisporcliente/porperiodo/dousuario/${idcliente}/doprofissional/${idprofissional}/inicio/${ano}/termino/${0}`
    );

  }
  getGraficoRecursoCliente( idUser: number, idcliente: number ,ano: number, agrupadopor:string) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/graficos/graficoB/dogestor/${idUser}/docliente/${idcliente}/doano/${ano}/agrupadopor/${agrupadopor}`
    );
  }

  getAllProjectRecurso( idUser: number, idcliente: number ,ano: number, agrupadopor:string) {
    return this.http.get(
      environment.api +
        `biprojetos/v1/graficos/graficoC/dogestor/${idUser}/docliente/${idcliente}/doprofissional/${0}/doano/${ano}/agrupadopor/${agrupadopor}`
    );
  }
  getAllProjects(idcliente : number, year : any) { 
    return this.http.get(
      environment.api +
        `biprojetos/v1/gestores/listagestores/${idcliente}/cnpj/${year}`
    );
  }

}
