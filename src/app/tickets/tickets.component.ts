import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket.service';
import {AgencyService} from 'src/app/services/agency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MassiveticketsComponent } from './massivetickets/massivetickets.component';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private service:TicketService, private agencyService: AgencyService,
    public dialog:MatDialog) { }

  TicketList:any=[];
  AgencyList:any=[];
  currentTicket = null;
  currentIndex = -1;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    this.refreshTicketList();
  }

  refreshTicketList(){
    this.service.getTicketList().subscribe(data => 
      {
       this.TicketList=data; 
      }),
    this.agencyService.getAgencyList().subscribe(agency=>
      {
        this.AgencyList = agency;
      });
  }

  refresh():void{
    this.refreshTicketList();
    this.currentTicket = null;
    this.currentIndex = -1;
  }

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
    console.log("VALOR TICKET GENERAL",this.currentTicket);
    console.warn(this.currentIndex);
  }

  openDialogExcelBox(){
    this.dialog.open(MassiveticketsComponent);
  }
}
