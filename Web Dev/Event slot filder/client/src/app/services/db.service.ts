import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserExist } from '../UserExist';
import { SignUp } from '../SignupTemplate';
import { Login } from '../LoginTemplate';
import { Hall } from '../Hall';
import { GetHalls } from '../getHalls';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class DbService {
  private apiURI: string = 'https://stark-inlet-85258.herokuapp.com';
  // private apiURI: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}
  signUp(user: SignUp): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/signup`, user, httpOptions);
  }

  login(user: Login): Observable<UserExist> {
    return this.http.post<UserExist>(`${this.apiURI}/login`, user, httpOptions);
  }

  logout(token: any): Observable<any> {
    return this.http.delete<any>(`${this.apiURI}/logout`, {
      headers: new HttpHeaders({
        token: token,
        'Content-Type': 'application/json',
      }),
    });
  }
  createHalls(data: Hall): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/createHalls`, data, httpOptions);
  }
  getHalls(): Observable<GetHalls> {
    return this.http.get<GetHalls>(`${this.apiURI}/getBooking`, httpOptions);
  }
  sendSearchData(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiURI}/searchBooking`,
      data,
      httpOptions
    );
  }
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/createBooking`, data, {
      headers: new HttpHeaders({
        token: data.token,
        'Content-Type': 'application/json',
      }),
    });
  }
  getBookingByUser(data: any): Observable<any> {
    console.log('token before sending to DB: ', data);
    return this.http.get<any>(`${this.apiURI}/getBookingByUser`, {
      headers: new HttpHeaders({
        token: data,
        'Content-Type': 'application/json',
      }),
    });
  }
  deleteBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/deleteBooking`, data, {
      headers: new HttpHeaders({
        token: data.token,
        'Content-Type': 'application/json',
      }),
    });
  }
}
