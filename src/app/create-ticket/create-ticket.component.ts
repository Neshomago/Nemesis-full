import { Component, OnInit } from '@angular/core';
import { TicketService} from '../services/ticket.service';
import { Tickets} from '../tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';

import { Router} from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  customerId = localStorage.getItem('customerId');
  creatorId: any;

    ticketModel: Tickets = {
    createdBy: '',
    type: '',
    customerId: String(this.customerId),
    status:'OPENED',
    priority:'',
    agencyId:'',
    description:'',
    ids: '',
    version: 1,
    code:'',
  }
  
  constructor(private ticketService:TicketService, private _snackBar:MatSnackBar, private router:Router) {
    if(localStorage.getItem('id')) {
      this.creatorId = localStorage.getItem('id');
    }
   }
  
  ngOnInit(): void {
    this.getAgencyName();
    console.log("customerId al crear ticket: ",this.customerId);
  }

  myControl = new FormControl();
  AgencyList: any = [];

  getAgencyName(){
    this.ticketService.getAgencyName(String(this.customerId)).subscribe(agency => {
      this.AgencyList = agency;
    })

  }
    
  addTicket(){
    this.ticketModel.createdBy = String(localStorage.getItem('id'));
    this.ticketService.addTicket(this.ticketModel).subscribe(
      (data) => { 
        console.log("valor de ticketmodel CreatedBy", this.ticketModel.createdBy)
        console.log('Ticket Registered', data);
      this._snackBar.open("Ticket Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/tickets"); },
      (error) => { console.log('Failed to Register Ticket', error);
      this._snackBar.open("Failed to Register Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }

  saveTicket(){
    this.addTicket();
  }
}
