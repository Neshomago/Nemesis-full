import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  AgencyList:any=[];

  constructor(private agencyService: SharedService) { }

  ngOnInit(): void {
    this.refreshAgencyList();
  }

  refreshAgencyList(){
    this.agencyService.getAgencyList().subscribe(data => 
      {
       this.AgencyList = data; 
      })
  }
}
