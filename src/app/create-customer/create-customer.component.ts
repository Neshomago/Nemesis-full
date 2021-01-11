import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {SharedService} from '../shared.service';
import {Customer} from '../customer';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  customerModel = new Customer('','','','','','',1);

  constructor(private customerService:SharedService) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.customerService.addCustomer(this.customerModel).subscribe(
      data => console.log('Customer Registered', data),
      error => console.log('Failed to Register Ticket', error)
    )
   }
 
   saveCustomer(){
     this.addCustomer();
   }
}
