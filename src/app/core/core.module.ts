import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth/auth.interceptor';
import { CurrentUserService } from './auth/current-user.service';
import { AuthService } from './auth/auth.service';
import { OrderService } from './order/order.service';
import { CustomerService } from './customer/customer.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],

  providers: [
    CurrentUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CustomerService,
    OrderService,
    AuthService
  ]
})
export class CoreModule {
  constructor(private auth: AuthService) {}
}
