import { Component, OnInit } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { ModalConfirmationComponent } from "./modal-confirmation/modal-confirmation.component";
import { FormModalComponent } from "./form-modal/form-modal.component";
import { LoginService } from "src/app/security/login/login.service";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./e-commerce.component.html",
  styleUrls: ["./e-commerce.component.scss"],
  preserveWhitespaces: true,
})
export class ECommerceComponent implements OnInit {
  demo_hint = `
  interface initOpts {{'{'}}
  devicePixelRatio?: number,
  renderer?: string,
  width?: number|string,
  height? number|string,
}`;

  options = {
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
        data: ["JAN/20", "FEV/20", "MAR/20", "ABR/20", "MAIO"],
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
        data: [60, 20, 40, 10, 120],
      },
    ],
  };

  initOpts = {
    renderer: "svg",
    width: 250,
    height: 250,
  };

  hoursWorks = {
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
        data: [5668, 5376],
      },
    ],
  };

  collaborators = {
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
        data: ["JAN/20", "FEV/20", "MAR/20", "ABR/20", "MAIO"],
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
        name: "n° de colaboradores",
        type: "bar",
        barWidth: "60%",
        data: [8, 11, 3, 10],
      },
    ],
  };

  collaboratorsMonth = {
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
        data: ["JAN/20"],
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
        name: "n° de colaboradores",
        type: "bar",
        barWidth: "60%",
        data: [8],
      },
    ],
  };

  month = {
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
        data: ["JAN/20"],
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
        name: "n° de colaboradores",
        type: "bar",
        barWidth: "60%",
        data: [8, 11, 3, 10],
      },
    ],
  };

  public step: number = 0;
  frag = false;
  names: string[] = [];

  public unity: any;
  public;
  customers = [];

  selectedFilted = { unity: ""}
  

  constructor(
    private dialogService: NbDialogService,
    private serviceLogin: LoginService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.service.getUnidadesProvider("202003", "202003").subscribe((data) => {
      this.unity = data;
    });
  }

  getClients(unity: string) {
    this.service.getClientes(unity).subscribe((data) => {
      this.customers = data;
      this.selectedFilted.unity = unity
      this.step++;
    });
  }

  advanceStep(hideen?: any) {
    if (hideen) {
      this.frag = true;
    }
    this.step++;
    if (hideen === 7) {
      console.log("estou aqui");
      this.step = 7;
    }

    if (hideen === 8) {
      this.step = 8;
    }
  }

  backStep() {
    this.step--;
  }

  open() {
    this.dialogService.open(ModalConfirmationComponent, {
      context: {
        title: "This is a title passed to the dialog component",
      },
    });
  }

  open3() {
    this.dialogService
      .open(FormModalComponent)
      .onClose.subscribe((name) => name && this.names.push(name));
  }
}
