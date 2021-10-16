import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GetHalls } from 'src/app/getHalls';
import { DbService } from '../../services/db.service';
import { HallOutput } from 'src/app/getHalls';
import { Router } from '@angular/router';
import { Booking } from 'src/app/Booking';
import { LayoutService } from 'src/app/services/layout.service';
import { CustomBreakpointNames } from 'src/app/services/breakpoints.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  imagePath: string;
  Halls: HallOutput[] = [];
  userSearch: boolean = true;
  userBooking: boolean = false;
  Bookings: any = [];
  cols: string = '1';
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  rowHeight: string = '1:0.3';
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  token: string | null = localStorage.getItem('Token');
  constructor(
    private db: DbService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.imagePath = '/assets/booking.png';
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
          this.rowHeight = '1:0.5';
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.small)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          this.rowHeight = '1:0.5';
          console.log('Mobile phones', this.isMobile);
        } else if (
          this.layoutService.isBreakpointActive(CustomBreakpointNames.medium)
        ) {
          this.cols = '1';
          this.isMobile = true;
          this.isDesktop = false;
          this.rowHeight = '1:0.5';
          console.log('Mobile phones', this.isMobile);
        } else {
          this.cols = '2';
          this.isDesktop = true;
          this.isMobile = false;
          this.rowHeight = '1:0.3';
          console.log('Desktop', this.isDesktop);
        }
      });
    this.getAllHalls();
    this.getBookingsbyUser();
  }
  getAllHalls(): void {
    this.db.getHalls().subscribe(
      (data: GetHalls) => {
        this.Halls = data.halls;
        this.Halls.forEach((hall) => {
          hall.booking_available = true;
        });
      },
      (err) => {
        console.log('Error: ', err);
      },
      () => {
        console.log('Fetching halls completed', this.Halls);
      }
    );
  }
  getBookingsbyUser(): void {
    this.db.getBookingByUser(this.token).subscribe(
      (data: any) => {
        let response = data.response;
        this.Bookings = response;

        console.log('All Halls Data for this user: ', this.Bookings);
      },
      (err) => {
        console.log('error: ', err);
      },
      () => {
        let booking;
        for (booking of this.Bookings) {
          booking.start_date = booking.start_date.split('T')[0];
          booking.end_date = booking.end_date.split('T')[0];
        }

        console.log('completed');
        console.log('Booking data: ', this.Bookings);
      }
    );
  }
  search_date(): void {
    this.userBooking = false;
    this.userSearch = true;
    console.log('search_date: ', this.range.value.start, this.range.value.end);
    this.db
      .sendSearchData({
        start_date: this.range.value.start,
        end_date: this.range.value.end,
      })
      .subscribe(
        (data) => {
          console.log('data incoming: ', data);
          console.log('lngth of data: ', data.data.length);
          if (data.data.length > 0) {
            let booking_halls = [];
            booking_halls = data.data;
            console.log('If available: ', booking_halls[0].available);
            this.compare(this.Halls, booking_halls);
          }
        },
        (err) => {
          console.log('error: ', err);
        },
        () => {
          console.log('completed', this.Halls);
        }
      );
  }
  book(hall: any): void {
    hall.token = localStorage.getItem('Token');
    if (!this.range.value.start || !this.range.value.end) {
      alert('Enter starting and ending dates');
    } else {
      hall.start_date = this.range.value.start;
      hall.end_date = this.range.value.end;
      this.db.createBooking(hall).subscribe(
        (data) => {
          console.log('data: ', data);
          alert(`${hall.Name} has been booked for you`);
          this.router.navigate(['']);
        },
        (err) => {
          console.log('error: ', err);
        },
        () => {
          console.log('completed');
        }
      );
    }
  }
  your_bookings(): void {
    this.userSearch = false;
    this.userBooking = true;
  }
  delete_book(booking: any): void {
    booking.token = localStorage.getItem('Token');
    console.log('Booking', booking);
    this.db.deleteBooking(booking).subscribe(
      (data) => {
        console.log('data: ', data);
        alert(`${booking.Name} has been deleted`);
        this.router.navigate(['']);
      },
      (err) => {
        console.log('error: ', err);
      },
      () => {
        console.log('completed');
      }
    );
  }
  compare(arr1, arr2): void {
    console.log('came in comparing', arr1, '\n', arr2);
    if (!arr1 || !arr2) {
      return arr1;
    }
    arr1.forEach((e1, i) => {
      arr2.forEach((e2) => {
        if (e1.length > 1 && e2.length) {
          this.compare(e1, e2);
        } else if (e1 !== e2) {
          e1.booking_available = false;
        } else {
          e1.booking_available = true;
        }
      });
      return e1;
    });
  }
}
