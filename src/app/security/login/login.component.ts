import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formlogin;
  constructor(private fb: FormBuilder, private service : LoginService, private route: Router) { 
    this.formlogin = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }
  ngOnInit(): void {
    
  }

  login() {
    console.log(this.formlogin.value.email)
    if (this.formlogin.value.email === "adyson@provider.com" && this.formlogin.value.password === "123") {
      this.service.user = "adyson"
      this.route.navigate(['/'])
    }
  }

}
