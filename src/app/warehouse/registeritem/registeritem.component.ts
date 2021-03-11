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
  
  warehouses:any =[];
  
    itemModel: ItemWarehouse = {
      name: '',
      description:'',
      serial: '',
      warehouseId: 5,
      isUsed: 0,
      warrantyPeriod: 12,
      categoryId: 0,
      isMoving: 0,
      supplier: '',
      isDeleted: 0,
      status:'',
      invoice_purchase: '',
      //registerDate: new Date,
      //statusDetails: '',
      //userId: 0,
      //activationCode: '',
      //technicianNotes:'',
      //vehicle_Id: 0,
      //technicianId: 0,
      //technicianAssigned: '',
      //agencyId: 0,
      //customerId: 0,
      //dateofArrive: undefined,
      //dateofRemoval: undefined
  }

  category:any ={
    category_name:''
  }


  constructor(private _snackBar:MatSnackBar, private router:Router, private service:WarehouseService) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.getWarehouses();
  }

  categoryList:any =[];
  getCategoryList(){
    this.service.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  }

  addCategory(){
    this.service.addCategory(this.category).subscribe(
      data => {this.category = data;
      console.log(this.category + "Was added to category list")}
    );
    this.category = [];
    this.getCategoryList();
  }


  getWarehouses(){
    this.service.getWarehouseList().subscribe(
      data => {this.warehouses = data}
    );
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
