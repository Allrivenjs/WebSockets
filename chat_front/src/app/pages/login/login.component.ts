import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formulario: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
    this.formulario = new FormGroup({});
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
        email: new FormControl(null, Validators.required),
        password: new  FormControl(null, Validators.required)
    })
  }

  login(){
    this.authService.sendLogin(this.formulario.value).subscribe( async (resp: any) => {
      localStorage.setItem('token',resp.token);
      localStorage.setItem('user',JSON.stringify(resp.user));
      await this.router.navigate(['chat']);
    });
  }

}
