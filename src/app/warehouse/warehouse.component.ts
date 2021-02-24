import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewitemsetComponent } from 'src/app/warehouse/viewitemset/viewitemset.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  TheGeneralList:any = [];
  currentIndex = -1;
  currentItem = null;

  constructor(private whsservice: WarehouseService,
    public dialog:MatDialog) { }

  
  ngOnInit(): void {
    this.getListofItemsinWarehouse();
  }
  

  // Getting general info of Items
  getListofItemsinWarehouse(){
    this.whsservice.getItemsListperType().subscribe(
      data => { this.TheGeneralList = data;
    });
  }
  
  setCurrentItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }

  openDialogItemSetBox(id:any){
    this.dialog.open(ViewitemsetComponent);
  }
}
