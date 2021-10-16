import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate(): boolean {
    if (
      localStorage.getItem('Token') &&
      (localStorage.getItem('Role') === 'user')
    ) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
