import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private service:SharedService) { }

  TicketList:any=[];

  ngOnInit(): void {
    this.refreshTicketList();
  }

  refreshTicketList(){
    this.service.getTicketList().subscribe(data => 
      {
       this.TicketList=data; 
      })
  }

}
