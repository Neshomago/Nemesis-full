import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor( private customerService: SharedService,  private fb:FormBuilder) { }

  CustomerList: any =[];

  ngOnInit(): void {
  this.refreshCustomerList();    
  }

  refreshCustomerList(){
    this.customerService.getCustomerList().subscribe(
      data =>{
        this.CustomerList = data
      }
    );
  }

}
