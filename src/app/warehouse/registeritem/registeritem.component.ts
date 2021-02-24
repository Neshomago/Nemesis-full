import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemWarehouse } from 'src/app/tickets';
import { WarehouseService } from 'src/app/services/warehouse.service';
@Component({
  selector: 'app-registeritem',
  templateUrl: './registeritem.component.html',
  styleUrls: ['./registeritem.component.scss']
})
export class RegisteritemComponent implements OnInit {

    itemModel: ItemWarehouse = {
      name: '',
      description:'',
      serial: '',
      supplier: '',
      status:'',
      warrantyPeriod: 12,
      //registerDate: new Date,
      category: '',
      //statusDetails: '',
      //userId: 0,
      //activationCode: '',
      //technicianNotes:'',
      isMoving: 0,
      isDeleted: 0,
      warehouseId: 0,
      //vehicle_Id: 0,
      //technicianId: 0,
      //technicianAssigned: '',
      isUsed: 0,
      invoice_purchase: '',
      //agencyId: 0,
      //customerId: 0,
      //dateofArrive: undefined,
      //dateofRemoval: undefined
  }

  constructor(private _snackBar:MatSnackBar, private router:Router, private service:WarehouseService) { }

  ngOnInit(): void {
  }

  addItem(){
    this.service.addItemWarehouse(this.itemModel).subscribe(
      (data) => { console.log('Item Registered succesfully', data);
      this._snackBar.open("Item Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/warehouse"); },
      (error) => { console.log('Failed to Register Item', error);
      this._snackBar.open("Failed to Register Item", "OK", { duration:3500, panelClass: "error",}); },
    );
  }

  saveItem(){
    this.addItem();
  }

}
