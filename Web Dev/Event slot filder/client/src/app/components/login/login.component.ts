import { Component, OnInit } from '@angular/core';
import { Login } from '../../LoginTemplate';
import { DbService } from '../../services/db.service';
import { UserExist } from '../../UserExist';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { CustomBreakpointNames } from 'src/app/services/breakpoints.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imagePath: string;
  email!: string;
  pass!: string;
  cols: string = '1';
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  constructor(
    private auth: DbService,
    private route: Router,
    private layoutService: LayoutService
  ) {
    this.imagePath = '/assets/Punjabi.jpg';
  }

  ngOnInit(): void {
    this.layoutService
      .subscribeToLayoutChanges()
      .subscribe((observerResponse) => {
        // You will have all matched breakpoints in observerResponse
        console.log('Layout Observer response', observerResponse);
        if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.xSmall)
        ) {
          // Do something here for Moto G4, Galaxy S5, Pixel 2, Pixel 2 XL, iphone5/SE, iphone6/7/8 plus, iphone X, Surface Duo, Galaxy Fold devices
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.small)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.medium)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          console.log('Mobile phones', this.isMobile);
        } else {
          this.cols = '2';
          this.isDesktop = true;
          this.isMobile = false;
          console.log('Desktop', this.isDesktop);
        }
      });
  }

  onSubmit(): void {
    if (!this.email || !this.pass) {
      alert('Please enter email and password');
    }
    const newLogin: Login = {
      email: this.email,
      password: this.pass,
    };
    console.log('form Submitted', newLogin);
    this.auth.login(newLogin).subscribe(
      (data: UserExist) => {
        console.log(data);
        localStorage.setItem('Name', data.Name);
        localStorage.setItem('Token', data.Token);
        localStorage.setItem('Role', data.Role);
        localStorage.setItem('response', data.response);
        alert('login Successful');
        this.route.navigate(['']);
      },
      (err) => {
        console.log(err);
        alert('Login Failed enter correct email and password');
      },
      () => {
        console.log('completed');
      }
    );
  }
}
