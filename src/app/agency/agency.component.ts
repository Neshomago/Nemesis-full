import { Component, OnInit } from '@angular/core';
import {AgencyService} from 'src/app/services/agency.service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  AgencyList:any=[];

  constructor(private service: AgencyService) { }

  ngOnInit(): void {
    this.refreshAgencyList();
  }

  refreshAgencyList(){
    this.service.getAgencyList().subscribe(data => 
      {
       this.AgencyList = data; 
      })
  }

  

}
