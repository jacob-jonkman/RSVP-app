import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit() { }

  login(email, password) {
    if (email == null || password == null) {
      console.log('email of password niet ingevuld');
      return;
    }
    this.loginService.login(email, password)
      .then(ret => {
        if (ret != null) {
          this.router.navigate(['/activities']);
        }})
      .catch(() => console.log('er ging iets mis met inloggen'));
  }
}
