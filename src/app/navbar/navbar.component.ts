import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    if (this.loginService.getUser() != null) {
      this.loginService.logout()
        .then(() => this.router.navigate(['']));
    } else {
      return;
    }
  }
}
