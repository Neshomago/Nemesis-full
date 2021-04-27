import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-viewitemset',
  templateUrl: './viewitemset.component.html',
  styleUrls: ['./viewitemset.component.scss']
})
export class ViewitemsetComponent implements OnInit {

  id: number | undefined;
  itemListtotal: any =[];
  currentIndex = -1;
  currentItem: any;

  constructor(
    private route:ActivatedRoute,
    private wrhsService: WarehouseService,
    private agencyService: AgencyService,
  ) { }

  ngOnInit(): void {
    this.id = +this.getitemIndividualDistrubitionList(this.route.snapshot.paramMap.get('id'));
    this.getWarehouses();
    this.getAgencyList();
  }

  getitemIndividualDistrubitionList(id: any): any{
    this.wrhsService.getItemsIndividualList(id).subscribe(
      data => {
        this.itemListtotal = data;
        console.log(this.itemListtotal);
      }
    );
  }

  AgencyList: any = [];
  getAgencyList(){
    this.agencyService.getAgencyList().subscribe(
      data => {this.AgencyList = data;
      console.log("agencias: ", this.AgencyList);}
    )
  }

  warehouses:any=[];
  getWarehouses(){
    this.wrhsService.getWarehouseList().subscribe(
      data => {this.warehouses = data;
      console.log("bodegas: ",this.warehouses);}
    );
  }

  setCurrentIndividualItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }
}
