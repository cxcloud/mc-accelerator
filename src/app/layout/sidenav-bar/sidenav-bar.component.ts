import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit {
  sideMenu: Array<any> = [
    { title: 'Dashboard', icon: 'mdi mdi-speedometer', link: '/dashboard' },
    { title: 'Orders', icon: 'mdi mdi-cart-outline', link: '/orders' },
    {
      title: 'Customers',
      icon: 'mdi mdi-account-multiple-outline',
      link: '/customers'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
