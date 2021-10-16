import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { CustomBreakpointNames } from 'src/app/services/breakpoints.service';
@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css'],
})
export class HeroImageComponent implements OnInit {
  imagePath: string;
  cols: string = '1';
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  constructor(private layoutService: LayoutService) {
    this.imagePath = '/assets/House.png';
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
}
