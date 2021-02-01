import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.scss']
})
export class ViewcustomerComponent implements OnInit {

  id: number | undefined;
  constructor(private service: CustomerService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.getCustomerIndividual(this.route.snapshot.paramMap.get('id'));
  }

  theCustomerData : any = [];
    
  getCustomerIndividual(id:any):any{
    this.service.getCustomerIso(id).subscribe((data)=> {
      this.theCustomerData = data;
      console.log(data);
    },
    error =>{console.log(error);
    }
    );
  }
}
