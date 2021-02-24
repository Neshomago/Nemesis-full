import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    //this.id = +this.getItemsIndividualList(this.route.snapshot.paramMap.get('id'));
  }

  getitemIndividualDistrubitionList(id: any): any{
    this.wrhsService.getItemsIndividualList(id).subscribe(
      data => {
        this.itemListtotal = data;
      }
    );
  }

  setCurrentIndividualItem(item:any, index:any): void{
    this.currentItem = item;
    this.currentIndex = index;
  }
}
