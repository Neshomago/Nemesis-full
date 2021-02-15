import { Component, OnInit } from '@angular/core';
import {AgencyService} from 'src/app/services/agency.service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  
  constructor(private service: AgencyService) { }
  
  AgencyList:any=[];

  currentAgency = null;
  currentIndex = -1;
  

  ngOnInit(): void {
    this.refreshAgencyList();
  }

  refreshAgencyList(){
    this.service.getAgencyList().subscribe(data => 
      {
       this.AgencyList = data; 
      })
  }

  setCurrentAgency(agency:any, index:any): void{
    this.currentAgency = agency;
    this.currentIndex = index;
  }

}
