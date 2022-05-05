import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticate: AuthService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  logout() {
    this.router.navigate(['login']);
    this.authenticate.logout();
    this.toast.info('Logout realizado com sucesso', 'LogOut', {
      timeOut: 7000,
    });
  }
}
