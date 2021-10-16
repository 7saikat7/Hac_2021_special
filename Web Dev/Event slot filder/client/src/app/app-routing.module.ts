import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookingComponent } from './components/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
const routes: Routes = [
  {
    path: '',
    component: HeroImageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
