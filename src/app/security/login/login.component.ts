import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from "@nebular/theme";
import { config } from "rxjs";
import { User } from "../user-model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formlogin;
  user: User;
  private index: number = 0;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private route: Router,
    private toastrService: NbToastrService,
    private toastr: ToastrService
  ) {
    this.formlogin = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
  ngOnInit(): void {}

  login() {
    this.service.logout();
    this.service
      .login(this.formlogin.value.email, this.formlogin.value.password)
      .subscribe(
        (data) => {
          this.user = data;
          if (data.erro === 0) {
            localStorage.setItem("item", JSON.stringify(this.user));
            this.toastr.success("login realizado com sucesso.");
            if (data.trocarSenha === 1) {
              this.route.navigate(["primeiro-acesso"]);
              // this.route.navigate(["/"]);
            } else {
              this.route.navigate(["/"]);
            }
          } else {
            this.toastr.error("Senha ou email incorretos.");
          }
        },
        (error) => {}
      );
    // if (
    //   this.formlogin.value.email === "adyson@provider.com" &&
    //   this.formlogin.value.password === "123"
    // ) {
    //   this.service.user = { name: "Adyson", email: "adyson@provider.com" };
    //   this.route.navigate(["/"]);
    // }
  }
}
