import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../core';
import { Order } from '@cxcloud/ct-types/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  columns: Array<any> = [
    { name: 'Order ID', field: 'id' },
    { name: 'Order Total', field: 'totalPrice.centAmount' },
    { name: 'No. of items', field: 'lineItems.length' },
    { name: 'Order Status', field: 'orderState' },
    { name: 'Date Created', field: 'createdAt' },
    { name: 'Customer Email', field: 'customerEmail' }
  ];
  placeholder = '------';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(result => (this.orders = result));
  }

  selectOrder(orderId) {
    this.router.navigateByUrl(`/orders/${orderId}`);
  }
}
