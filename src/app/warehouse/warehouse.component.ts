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

  filteredString: string = '';
  TheGeneralList:any = [];
  currentIndex = -1;
  currentItem = null;

  filter = false;
  showstockedit = false;

  constructor(private whsservice: WarehouseService,
    public dialog:MatDialog) { }

  
  ngOnInit(): void {
    this.getListofItemsinWarehouse();
    this.getCategoryList();
  }
  

  // getitemIndividualDistrubitionList(id: any): any{
  //   this.whsservice.getItemsIndividualList(id).subscribe(
  //     data => {
  //       this.itemListtotal = data;
  //       console.log(this.itemListtotal);
  //     }
  //   );
  // }

  // Getting general info of Items
  getListofItemsinWarehouse(){
    this.whsservice.getItemsList().subscribe(
      data => { this.TheGeneralList = data;
        console.log(this.TheGeneralList);
    });
  }

  categoryList:any =[];
  getCategoryList(){
    this.whsservice.getCategories().subscribe(
    data => { this.categoryList = data;
      console.log(this.categoryList);
    });
  }
  
  setCurrentItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }

  stockEdit(){
    this.showstockedit = !this.showstockedit;
  }

  filteredResult: any = [];
  onSearchTerm(){
    let resp: any = this.TheGeneralList.filter(
      (item:any) => item.serial.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);
      console.log(resp);
      if (resp != null || resp != undefined || resp != ''){
        this.filter = true;
        this.filteredResult = resp;
        console.log(this.filteredResult);
        return resp;
      } else (resp == '' || resp == null || resp ==undefined); {
        this.filter = false;
      }
  }

  setCurrentIndividualItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }
  // openDialogItemSetBox(id:any){
  //   this.dialog.open(ViewitemsetComponent);
  // }
}
