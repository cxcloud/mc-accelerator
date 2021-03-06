import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, OrderService } from '../../core';
import { Order } from '@cxcloud/ct-types/orders';
import { Customer } from '@cxcloud/ct-types/customers';
import { Address } from '@cxcloud/ct-types/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  customer: any;
  shippingAddress: Address;
  billingAddress: Address;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // Get order by its id
      this.orderService.getOrder(params['id']).subscribe(order => {
        if (order) {
          this.order = order;
          console.log(order);
          this.getCustomer(order.customerId);
        }
      });
    });
  }

  getCustomer(customerId) {
    this.customerService.getCustomer(customerId).subscribe(customer => {
      this.customer = customer;
      this.shippingAddress = this.customerService.getShippingAddress();
      this.billingAddress = this.customerService.getBillingAddress();
    });
  }
}
