import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.scss']
})
export class EdititemComponent implements OnInit {
  
  id: number | undefined;
  theItemWarehouse: any =[];
  edit = false;
  
  currentIndex = -1;
  
  changesItem: any = {
    serial:'',
    activation:'',
    warehouserId:5,
    used:0,
    location:'',
    status:'',
    statusDescription:'',
    warranty_invoiceDate:'',
    warranty_period:12,
  };



  trackingData:any =[];

  nombre: any;
  surname: any;
  useridfortrack: any;

  constructor(
    private service: WarehouseService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    if(localStorage.getItem('nombre')) {
      this.nombre = localStorage.getItem('nombre'); 
    }
    if(localStorage.getItem('surname')) {
      this.surname = localStorage.getItem('surname'); 
    }
    if(localStorage.getItem('id')) {
      this.useridfortrack = localStorage.getItem('id');
    }
   }

  ngOnInit(): void {
    this.id = +this.getWarehouseItemIso(this.route.snapshot.paramMap.get('id'));
    this.getCategoryList();
    this.getWarehouses();
  }

  editFields(){
    this.edit = !this.edit;
  }

  getWarehouseItemIso(id:any):any{
    this.service.getItemIso(id).subscribe(
      (data)=>{
        this.theItemWarehouse = data[0];
        this.changesItem.name = data[0].name;
        this.changesItem.categoryId = data[0].categoryId;
        this.changesItem.serial = data[0].serial;
        this.changesItem.activation = data[0].activation;
        this.changesItem.warehouseId = data[0].warehouseId;
        this.changesItem.used = data[0].used;
        this.changesItem.location = data[0].location;
        this.changesItem.status = data[0].status;
        this.changesItem.statusDescription = data[0].statusDescription;
        this.changesItem.warranty_invoiceDate = data[0].warranty_invoiceDate;
        this.changesItem.warranty_period = data[0].warranty_period;
        this.trackingInfo.itemId = data[0].serial;
        this.erase.isDelete = data[0].isDelete;
        console.log('tracking info: ', this.trackingInfo);
      },
      error => {console.log(error);
      });

      this.getTrackingData(id)
  }

  updateChanges(id:any){
    this.setDefaultDate();
    this.service.updateWarehouseItem(id, this.changesItem).subscribe(
      (data)=>{
        this.theItemWarehouse.name = this.changesItem.name;
        this.theItemWarehouse.categoryId = this.changesItem.categoryId;
        this.theItemWarehouse.serial = this.changesItem.serial;
        this.theItemWarehouse.activation = this.changesItem.activation;
        this.theItemWarehouse.warehouseId = this.changesItem.warehouseId;
        this.theItemWarehouse.used = this.changesItem.used;
        this.theItemWarehouse.location = this.changesItem.location;
        this.theItemWarehouse.status = this.changesItem.status;
        this.theItemWarehouse.statusDescription = this.changesItem.statusDescription;
        this.theItemWarehouse.warranty_invoiceDate = this.changesItem.warranty_invoiceDate;
        this.theItemWarehouse.warranty_period = this.changesItem.warranty_period;
        this.changesItem = data;
        this._snackBar.open("Item Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
  }

  erase:any= {
    
  };
  deleteItem(id:any){
    this.service.deleteWarehouseItem(id, this.erase).subscribe(
      (data)=>{
        this.theItemWarehouse.isDelete = 1;
        this.theItemWarehouse.isDelete = this.erase.name;
        this.erase = data;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });

  }

  invoiceDate=new Date();
  trackingInfo: any ={
    itemId:'',
    userId:'',
    changes:'',
    type:'Edit Item',
    descriptionTrack:'Made Modifications on item details'
    // rawData:'',
    // userTraza:''
  }

  setDefaultDate(){
    let year, month, day, hour, minute, second;

    year = this.invoiceDate.getFullYear();
    month = this.invoiceDate.getMonth()+1;
    day = this.invoiceDate.getDate()+1;
    hour = this.invoiceDate.getHours();
    minute = this.invoiceDate.getMinutes();
    second = this.invoiceDate.getSeconds();

    this.changesItem.warranty_invoiceDate = year+'-'+month+'-'+day+' '+'0'+hour+':'+'0'+minute+':'+'0'+second;
  }
  
  saveItemTrack() {
    this.service.trackingItem(this.trackingInfo).subscribe(
      (data) => {
        this.theItemWarehouse.serial = this.trackingInfo.itemId;
        this.useridfortrack.id = this.trackingInfo.userId;

        console.log('valor de trackingino: ', this.trackingInfo);
        console.log('user info id:', this.useridfortrack);
        console.log(data);
      },
      error => {
        console.log(error)
      }
    );
  }

  warehouses:any=[];
  getWarehouses(){
    this.service.getWarehouseList().subscribe(
      data => {this.warehouses = data}
    );
  }

  categoryList:any =[];
  getCategoryList(){
    this.service.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  }

  
  getTrackingData(id:any){
    this.service.getTrackingData(id).subscribe(
      (data) => { this.trackingData = data;
      console.log('datos de tracking sacados de base: ', this.trackingData)}
      );
  }
}

