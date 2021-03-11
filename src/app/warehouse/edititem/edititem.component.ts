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

  constructor(
    private service: WarehouseService, private route:ActivatedRoute, private _snackBar: MatSnackBar,
  ) { }

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
        this.theItemWarehouse = data;
      },
      error => {console.log(error);
      });
  }

  changes: any = {
    serial:'',
    activation:'',
    warehouserId:5,
    used:0,
    location:'',
    status:'',
    statusDescription:'',
    warranty_period:12,
    userId:'',
    changes:'None',
    type:'NEW REGISTER',
    descriptionTrack:'New Item registration',
  };
  updateChanges(id:any){
    this.service.updateWarehouseItem(id, this.changes).subscribe(
      (data)=>{ this.changes = data;
        this._snackBar.open("Item Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
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
}

