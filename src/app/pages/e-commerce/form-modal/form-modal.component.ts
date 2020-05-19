import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ManagerService } from "../manager-client/manager-service";
import { Manager } from "../model/manager.model";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "src/app/security/login/login.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-form-modal",
  templateUrl: "./form-modal.component.html",
  styleUrls: ["./form-modal.component.scss"],
})
export class FormModalComponent implements OnInit {
  checked = false;
  @Input() manager: any;
  @Input() cnpj: string;
  formManager;
  constructor(
    private serviceLogin: LoginService,
    protected ref: NbDialogRef<FormModalComponent>,
    private managerService: ManagerService,
    private fb: FormBuilder,
    private toastr : ToastrService
  ) {}

  async ngOnInit() {
    this.formManager = this.fb.group({
      nome: [
        this.manager ? this.manager.gestorCliente : "",
        [Validators.required],
      ],
      email: [
        this.manager ? this.manager.gcEmail : "",
        [Validators.required, Validators.email],
      ],
    });
  }

  createManager() {
    const params = {
      nome: this.formManager.value.nome,
      email: this.formManager.value.email,
      emailAtual: "string",
      cnpj: this.cnpj,
      idGestorLogado: this.serviceLogin.user.id,
    };

    this.managerService.creatManager(params).subscribe((data) => {
      this.toastr.success("Usuário adicionado com sucesso")
      this.cancel();   
    }, error => {
      this.toastr.error("Não foi possível adicionar o usuário, entre em contato com suporte", error)
    });
  }

  update() {
    const params = {
      nome: this.formManager.value.nome,
      email: this.formManager.value.email,
      emailAtual: this.manager.gcEmail,
      cnpj: this.cnpj,
      idGestorLogado: this.serviceLogin.user.id,
    };
    this.managerService.updateManager(params).subscribe(data => {
      this.toastr.success('Dados alterados com sucesso !!!')
      this.cancel();
    }, error => {
      this.toastr.error('Não foi possível alterar as informações entre em contato com o suporte')
    }) 
  
  }

  typeAction() {
    if (this.manager) {
      return this.update();
    } 
    return this.createManager();
  }

  delete() {
    this.managerService.deleteManager(this.manager.gcEmail).subscribe( data => {
      this.toastr.success("Gestor do Cliente deletado com sucesso !!")
      this.cancel();
    }, error => {
      this.toastr.error("Não foi possível deletar o usuário, entre em contato com suporte !!!")
    })
  }
  
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close();
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }
}
