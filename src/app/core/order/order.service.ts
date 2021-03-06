import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Order } from '@cxcloud/ct-types/orders';

@Injectable()
export class OrderService {
  public order = new BehaviorSubject<Order>(null);

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>('/admin/orders');
  }

  getOrder(id: string) {
    return this.http
      .get<Order>(`/admin/orders/${id}`)
      .do(order => this.order.next(order));
  }

  get deliveries() {
    const order = this.order.getValue();
    if (order.shippingInfo) {
      return order.shippingInfo.deliveries;
    }
  }

  getDeliveryItems(id) {
    const order = this.order.getValue();
    const delivery = this.deliveries.filter(res => res.id === id)[0];
    return delivery.items.reduce((acc, item) => {
      const lineItem = {
        ...item,
        ...order.lineItems.filter(li => li.id === item.id)[0]
      };
      acc.push(lineItem);
      return acc;
    }, []);
  }

  updateOrder(action: any) {
    const order = this.order.getValue();

    return this.http
      .put<Order>(`/admin/orders/${order.id}/${order.version}`, {
        version: order.version,
        actions: [action]
      })
      .subscribe(res => this.order.next(res));
  }
}
