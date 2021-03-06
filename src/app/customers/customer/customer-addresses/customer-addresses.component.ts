import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../../core';
import { Customer } from '@cxcloud/ct-types/customers';
import { Address } from '@cxcloud/ct-types/common';

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.scss']
})
export class CustomerAddressesComponent implements OnInit {
  @Input('customer') customer: Customer;
  addresses: Address[];

  columns: Array<any> = [
    { name: 'Contact name' },
    { name: 'Company name' },
    { name: 'Address' },
    { name: 'City' },
    { name: 'Postal code' },
    { name: 'Region' },
    { name: 'Country' }
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    if (this.customer) {
      this.addresses = [
        this.customerService.getShippingAddress(),
        this.customerService.getBillingAddress()
      ];
    }
  }

  selectAddress() {
    console.log('Address');
  }
}
