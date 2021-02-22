import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemWarehouse } from 'src/app/tickets';

@Component({
  selector: 'app-registeritem',
  templateUrl: './registeritem.component.html',
  styleUrls: ['./registeritem.component.scss']
})
export class RegisteritemComponent implements OnInit {

    itemModel: ItemWarehouse = {
      name: '',
      code: '',
      supplier: '',
      condition: '',
      warranty_period: 12,
      dateofRegister: new Date,
      userId: 0,
      location: '',
      isMoving: 0,
      isDeleted: 0,
      warehouseId: 0,
      transportId: 0,
      transportDriver: '',
      itemStatus: '',
      invoice_buy: '',
      agencyId: 0,
      customerId: 0,
      dateofArrive: undefined,
      dateofRemoval: undefined
  }

  constructor(private _snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  saveItem(){
    this._snackBar.open("Failed to Save Item", "OK", { duration:3500, panelClass: "error",});
  }

}
