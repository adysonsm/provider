import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService} from "../login.service";
import { User } from "../../user-model";
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: "app-first-access",
  templateUrl: "./first-access.component.html",
  styleUrls: ["./first-access.component.sass"],
})
export class FirstAccessComponent implements OnInit {
  formlogin;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toastr: ToastrService,
    private route: Router,
  ) {}
  user: User;
  body: any;
  ngOnInit(): void {
    const token = localStorage.getItem("item");
    this.user = JSON.parse(token);
    this.formlogin = this.fb.group({
      passwordOld: ["", [Validators.required]],
      password: ["", [Validators.required]],
      password2: ["", Validators.required],
    });
  }

  equalsPassword() {
    return this.formlogin.value.password != this.formlogin.value.password2
      ? false
      : true;
  }

  validInput() {
    return this.equalsPassword() && this.formlogin.valid ? true : false;
  }
  updateSenha() {
    console.log(this.service.user);
    this.service
      .alterSenha(
        {
          senha: this.formlogin.value.passwordOld,
          novaSenha: this.formlogin.value.password,
        },
        this.user.id
      )
      .subscribe(
        data => {
          this.body = data
          if (this.body.erro === 2) {
            this.toastr.error(
              "Não é possível trocar a senha. Verifique e tente novamente."
            );
          } else {
            this.toastr.success("Senha alterada com Sucesso");
            this.route.navigate(['/'])
          }
        },
        (erro) => {
          this.toastr.error(erro);
        }
      );
  }
}
