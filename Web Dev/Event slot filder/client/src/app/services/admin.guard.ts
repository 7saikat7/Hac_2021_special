import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate(): boolean {
    if (
      localStorage.getItem('Token') &&
      localStorage.getItem('Role') === 'admin' &&
      localStorage.getItem('Name') === 'Raj Chetri'
    ) {
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}
