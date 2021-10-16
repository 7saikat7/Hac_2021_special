import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  elevate: Boolean = true;
  login_route: string = '/login';
  signup_route: string = '/signup';
  constructor(private auth: DbService, private router: Router) {}

  ngOnInit(): void {}
  hasRoute(): boolean {
    let response: boolean = true;
    if (this.router.url === this.login_route) {
      response = false;
    } else if (this.router.url === this.signup_route) {
      response = false;
    } else {
      response = true;
    }
    return response;
  }
  logout(): void {
    let token = localStorage.getItem('Token');
    this.auth.logout(token).subscribe(
      (data) => {
        console.log('User logged out: ', data);
        alert('user logged out');
        localStorage.removeItem('Token');
        localStorage.removeItem('Name');
        localStorage.removeItem('Role');
        localStorage.removeItem('response');
        this.router.navigate(['']);
      },
      (err) => {
        console.log('Error occured in logging out', err);
        alert('error logging out');
      },
      () => {
        console.log('Logout observable completed');
      }
    );
  }
  navButton(): void {
    if (localStorage.getItem('Token') !== null) {
      this.logout();
    } else {
      this.router.navigate(['login']);
    }
  }
}
