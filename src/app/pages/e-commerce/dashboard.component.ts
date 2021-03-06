import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { ModalConfirmationComponent } from "./modal-confirmation/modal-confirmation.component";
import { FormModalComponent } from "./form-modal/form-modal.component";
import { LoginService } from "src/app/security/login/login.service";
import { DashboardService } from "./dashboard.service";
import { Clientes } from "./model/cliente.model";
import { Manager } from "./model/manager.model";

@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],

  preserveWhitespaces: true,
})
export class Dashboard implements OnInit {
  demo_hint = `
  interface initOpts {{'{'}}
  devicePixelRatio?: number,
  renderer?: string,
  width?: number|string,
  height? number|string,
}`;

  public step: number = 0;
  frag = false;
  names: string[] = [];

  public unity: any;
  public;
  customers: [];
  projetcs;
  projectPeriod;
  projectPeriodMonth;
  timesheet;
  selectedClient: any;

  visable: boolean = true;

  gestorNome: string;

  selectedFilted = { name: "" };
  selectedYear = "2020";
  itemSelected: any;
  selectPeridoAloc: any;

  graficos: any;
  graficoProdutividaPeriodo;
  graficoNumeroPeriod;
  graficosTotaldehoras;
  SelecteGraficoPeriod;

  graficoAlocProdutivdade;
  graficoAlocNumeroPeriod;
  graficoAlocHoratrabalhadas;

  graficoClientRecuso;
  graficosTotaldehorasRecurso;

  graficoClienteProejtoProdPerio;

  projectPeriodoRecurso;

  typeOfAcesso: string;
  seletectAllClint: any;

  itemSelecteRecAlo;

  isProjecAll;

  initOpts = {
    renderer: "svg",
    width: 250,
    height: 250,
  };

  listaProfissionais: any;
  listaProfissionaisPeriodo: any;

  yearNow = new Date().getFullYear();

  itemSelectedProjectAll;

  graficsAllProject: any;

  graficoAllProject: any;
  graficoAlocNumeroPeriodAllprojc: any;
  constructor(
    private dialogService: NbDialogService,
    private serviceLogin: LoginService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.typeOfAcesso = this.serviceLogin.user.acessoTipo;
    this.service.getUnidadesProvider().subscribe((data) => {
      this.unity = data;
    });
  }
  selectYearR(event: any) {
    this.service
      .getProfissionaisPorPeriodo(
        this.itemSelecteRecAlo.idMembro,
        this.itemSelected.idCliente,
        event.target.value
      )
      .subscribe((data) => {
        this.getGraficoClienteRecurso(
          this.itemSelecteRecAlo.idMembro,
          this.itemSelected.idCliente,
          event.target.value,
          "mes"
        );
        this.listaProfissionaisPeriodo = data;
      });
  }

  selectYear(event: any) {
    this.service
      .getProjectPeriod(
        this.itemSelected.fkBaseProjeto,
        this.itemSelected.idCliente,
        this.itemSelected.fkProjeto,
        event.target.value
      )
      .subscribe((data) => {
        this.projectPeriod = data;
        if (data) {
          this.getGraficoPorHoraUteis(
            this.itemSelected.idCliente,
            this.itemSelected.fkProjeto,
            event.target.value,
            "Ano"
          );
          this.getGraficoPorPeriod(
            this.itemSelected.idCliente,
            this.itemSelected.fkProjeto,
            event.target.value,
            "MES"
          );
        }
      });
  }
  selectYearOperation(event: any) {
    this.service
      .getAllProjects(this.itemSelected.idCliente, event.target.value)
      .subscribe((data) => {
        this.projectPeriod = data;
        if (data) {
          this.getGraficoPorHoraUteis(
            this.itemSelected.idCliente,
            99999999,
            event.target.value,
            "Ano"
          );
          this.getGraficoPorPeriod(
            this.itemSelected.idCliente,
            99999999,
            event.target.value,
            "MES"
          );
        }
      });
  }

  getClients(unity) {
    this.service.getClientes(unity.fkBaseProjeto).subscribe((data) => {
      this.customers = data;
      this.selectedFilted.name = unity.uf;
      this.step++;
    });
  }

  getProjects(item) {
    this.selectedClient = item;
    this.gestorNome = item.gestorNome;
    this.itemSelected = item;
    this.service
      .getProjects(item.fkBaseProjeto, item.idCliente)
      .subscribe((data) => {
        this.gestorNome;
        this.projetcs = data;
        this.gestorNome = this.projetcs[0].gestorNome;
        this.step++;
      });
  }

  getProjectPeriod(item) {
    this.itemSelected = item;
    this.gestorNome = item.gestorNome;
    console.log("testando isso aqui");
    this.service
      .getProjectPeriod(
        item.fkBaseProjeto,
        item.idCliente,
        item.fkProjeto,
        "2020"
      )
      .subscribe((data) => {
        if (data) {
          this.getGraficoPorHoraUteis(
            item.idCliente,
            item.fkProjeto,
            2020,
            "Ano"
          );
          this.getGraficoPorPeriod(item.idCliente, item.fkProjeto, 2020, "MES");
        }

        this.projectPeriod = data;
        this.step++;
      });
  }

  getProfPerProj(item) {
    console.log(item);
    console.log(this.SelecteGraficoPeriod);
    let selectedPerido = this.SelecteGraficoPeriod.filter(
      (data) => data.anoMes === item.anoMes
    );
    if (selectedPerido) {
      this.graficoAlocProdutivdade = this.createGrafic(selectedPerido);
      this.graficoAlocNumeroPeriod = this.createGraficNColoboradores(
        selectedPerido
      );
      this.graficoAlocHoratrabalhadas = this.createGraficTotalHoras(
        parseInt(selectedPerido[0]?.tHorasMes.replace(":", ",")),
        parseInt(selectedPerido[0]?.tHorasTrab.replace(":", "."))
      );
    }

    this.itemSelected = item;
    this.service
      .getProjecPeridoProfissionais(
        item.anoMes,
        item.fkBaseProjeto,
        item.idCliente,
        item.fkProjeto
      )
      .subscribe((data) => {
        this.projectPeriodMonth = data;
        this.step++;
      });
  }

  getProjecPeridoProfissionais(item) {
    this.itemSelectedProjectAll = item;
    let selectedPerido = this.SelecteGraficoPeriod.filter(
      (data) => +data.anoMes === +item.clienteNomeCurto
    );
    this.service
      .getProjecPeridoProfissionais(
        item.clienteNomeCurto,
        this.itemSelected.fkBaseProjeto,
        this.itemSelected.idCliente,
        999999
      )
      .subscribe((data) => {
        this.projectPeriodoRecurso = data;
        this.step++;
      });
    if (selectedPerido) {
      this.graficoAllProject = this.createGrafic(selectedPerido);
      this.graficoAlocNumeroPeriodAllprojc = this.createGraficNColoboradores(
        selectedPerido
      );
      this.graficoAlocHoratrabalhadas = this.createGraficTotalHoras(
        parseInt(selectedPerido[0]?.tHorasMes.replace(":", ",")),
        parseInt(selectedPerido[0]?.tHorasTrab.replace(":", "."))
      );
    }
  }

  getTimesheet(item, value) {
    this.selectPeridoAloc = item;
    this.service
      .getTimeSheet(
        item.anoMes,
        item.fkBaseProjeto,
        item.idCliente,
        item.fkProjeto,
        item.idMembro
      )
      .subscribe((data) => {
        this.timesheet = data;
        // this.itemSelected = data[0];
        if (value === "all") {
          this.step = 6;
          if (value === "y") {
            this.step === 11;
          }
        } else {
          this.step++;
        }
        console.log(this.step, "estou sendo enganado por esse fdp");
      });
  }

  getProssionaisAll() {
    this.service
      .getProfissionaisPorCliente(this.itemSelected.idCliente)
      .subscribe((data) => {
        this.listaProfissionais = data;
        this.step = 7;
      });
  }

  getAllProjects() {
    this.service
      .getAllProjects(this.itemSelected.idCliente, this.yearNow)
      .subscribe((data) => {
        this.projectPeriod = data;
        if (data) {
          this.getGraficoPorHoraUteis(
            this.itemSelected.idCliente,
            99999999,
            this.yearNow,
            "Ano"
          );
          this.getGraficoPorPeriod(
            this.itemSelected.idCliente,
            99999999,
            this.yearNow,
            "MES"
          );
        }
        this.step = 9;
      });
  }

  getAllprojectRecurso(item) {
    this.itemSelected = item;
    this.service
      .getProjecPeridoProfissionais(
        item.anoMes,
        item.fkBaseProjeto,
        item.idCliente,
        item.fkProjeto
      )
      .subscribe((data) => {
        this.projectPeriodoRecurso = data;
        this.step++;
      });
  }

  getProssionalClientePerido(item) {
    this.itemSelecteRecAlo = item;
    this.service
      .getProfissionaisPorPeriodo(
        item.idMembro,
        this.itemSelected.idCliente,
        2020
      )
      .subscribe((data) => {
        this.getGraficoClienteRecurso(
          item.idMembro,
          this.itemSelected.idCliente,
          2020,
          "mes"
        );
        this.listaProfissionaisPeriodo = data;
        this.step++;
      });
  }

  backStep() {
    this.step--;
  }

  backTimeSheet() {
    console.log("estou aqui", this.step);
    if (this.step === 6) {
      this.step = 8;
    }
    if (this.step === 11) {
      this.step = 10;
    }
    if (this.step === 5) {
      this.step = 4;
    }
  }

  getGraficoPorPeriod(
    idcliente,
    idprojeto: number,
    ano: number,
    agrupadopor: string
  ) {
    this.service
      .getGraficoProdutividePeriod(idcliente, idprojeto, ano, agrupadopor)
      .subscribe((data) => {
        this.graficsAllProject = data;
        if (data) {
          this.SelecteGraficoPeriod = data;
          this.graficoProdutividaPeriodo = this.createGrafic(data);
          this.graficoNumeroPeriod = this.createGraficNColoboradores(data);
        }
      });
  }

  getAllProjetPeriodRecursos() {}

  getGraficoClienteRecurso(
    id: number,
    idcliente: number,
    ano: number,
    agrupadopor: string
  ) {
    this.service
      .getGraficoRecursoCliente(id, idcliente, ano, agrupadopor)
      .subscribe((data) => {
        this.graficoClientRecuso = this.createGrafic(data);
        this.graficosTotaldehorasRecurso = this.createGraficTotalHoras(
          parseInt(data[0].tHorasMes.replace(":", ",")),
          parseInt(data[0].tHorasTrab.replace(":", "."))
        );
      });
  }
  getGraficoClienteProjetos(
    idcliente: number,
    ano: number,
    agrupadopor: string
  ) {
    this.service
      .getGraficoRecursoCliente(0, idcliente, ano, agrupadopor)
      .subscribe((data) => {
        this.graficoClienteProejtoProdPerio = this.createGrafic(data);
        this.graficosTotaldehorasRecurso = this.createGraficTotalHoras(
          parseInt(data[0].tHorasMes.replace(":", ",")),
          parseInt(data[0].tHorasTrab.replace(":", "."))
        );
      });
  }
  getGraficoPorHoraUteis(
    idCliente,
    idprojeto: number,
    ano: number,
    agrupadopor: string
  ) {
    this.service
      .getGraficoProdutividePeriod(idCliente, idprojeto, ano, agrupadopor)
      .subscribe((data) => {
        this.graficsAllProject = data;
        this.graficosTotaldehoras = this.createGraficTotalHoras(
          parseInt(data[0].tHorasMes.replace(":", ",")),
          parseInt(data[0].tHorasTrab.replace(":", "."))
        );
      });
  }

  open3() {
    this.dialogService
      .open(FormModalComponent)
      .onClose.subscribe((name) => name && this.names.push(name));
  }

  createGrafic(item) {
    return {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: item.map((data) => this.transformValueDate("" + data.anoMes)),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "%",
          type: "bar",
          barWidth: "60%",
          data: item.map((data) => data.percProdutiv),
        },
      ],
    };
  }
  createGraficNColoboradores(item) {
    return {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: item.map((data) => this.transformValueDate("" + data.anoMes)),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "n",
          type: "bar",
          barWidth: "60%",
          data: item.map((data) => data.tMembros),
        },
      ],
    };
  }
  createGraficTotalHoras(tm, th) {
    return {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["H.trabalhadas", "H.úteis"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "horas",
          type: "bar",
          barWidth: "60%",
          data: [tm, th],
        },
      ],
    };
  }

  transformValueDate(item: string) {
    let ano = item.substring(0, 4);
    let mes = item.substring(4, 6);
    return `${mes}/${ano}`;
  }
}
