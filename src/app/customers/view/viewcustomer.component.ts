import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.scss']
})
export class ViewcustomerComponent implements OnInit {

  id: number | undefined;
  edit = false;

  constructor(private service: CustomerService, private route:ActivatedRoute, private _snackBar: MatSnackBar) { }

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

  editFields(){
    this.edit = !this.edit;
  }

  changes: any = {
    name:'',
    surname: '',
    taxCode: '',
    address: '',
    // email: '',
    phone: '',
  }
  updateChanges(id:any){
    this.service.updateCustomer(id, this.changes).subscribe(
      (data)=>{ this.changes = data;
        this._snackBar.open("User Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      
      });
  }
}
