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
import { User } from '../user-model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formlogin;
  user : User;
  private index: number = 0;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private route: Router,
    private toastrService: NbToastrService
  ) {
    this.formlogin = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
  ngOnInit(): void {}

  login() {
    this.service
      .login(this.formlogin.value.email, this.formlogin.value.password)
      .subscribe(
        (data) => {
          this.user = data;

          localStorage.setItem('item', JSON.stringify(this.user));
          if (data.erro === 0) {
            this.route.navigate(["/"]);
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
