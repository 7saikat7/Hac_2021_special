import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../SignupTemplate';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { CustomBreakpointNames } from 'src/app/services/breakpoints.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  imagePath: string;
  email!: string;
  name!: string;
  password!: string;
  verifyPass!: string;
  role: string = 'user';
  cols: string = '1';
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  rowHeight: string = '1:1';
  constructor(
    private db: DbService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.imagePath = '/assets/takla.jpg';
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
          this.rowHeight = '1.1:2';
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.small)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          this.rowHeight = '1.1:2';
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.medium)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          this.rowHeight = '1.1:2';
          console.log('Mobile phones', this.isMobile);
        } else {
          this.cols = '2';
          this.isDesktop = true;
          this.isMobile = false;
          this.rowHeight = '1:1';
          console.log('Desktop', this.isDesktop);
        }
      });
  }
  onSubmit(): void {
    if (!this.email || !this.password || !this.verifyPass) {
      alert('Please fill all the fields');
      return;
    }
    if (this.password !== this.verifyPass) {
      alert('Password does not match');
      return;
    } else {
      let signUp: SignUp = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
      };
      this.db.signUp(signUp).subscribe(
        (response) => {
          console.log('Signup successful', response);
          alert(response.status);
          this.router.navigate(['']);
        },
        (error) => {
          alert(error);
        },
        () => {
          console.log('Signup complete');
        }
      );
    }
  }
}
