import { Component, OnInit } from '@angular/core';
import { TicketService} from '../services/ticket.service';
import { AgencyService} from '../services/agency.service';
import { Tickets} from '../tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';

import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  
  customerId = 'USER000582147ee7db00';

  filteredAgencies: Observable<any[]> | undefined;
  
  // ticketModel = new Tickets('TEST','','', new Date() ,'OPEN','','','','',1,'');

    ticketModel: Tickets = {
    createdBy: '',
    type: '',
    customerId: '',
    status:'',
    priority:'',
    agencyId:'',
    description:'',
    ids: '',
    version: 1,
    creationDate: new Date(),
    code:'',
  }
  
  constructor(private ticketService:TicketService, private _snackBar:MatSnackBar, private agencyService:AgencyService) { }
  
  ngOnInit(): void {
    this.filteredAgencies = this.myControl.valueChanges.pipe(startWith(''),map(value=> this._filter(value)))
 
  }
  myControl = new FormControl();
  AgencyList: any[] =[];

  getAgencyName(){
    this.agencyService.getAgency(this.AgencyList.push()).subscribe(agency => {
      this.AgencyList = agency;
    })

  }
    
  addTicket(){
    this.ticketService.addTicket(this.ticketModel).subscribe(
      (data) => { console.log('Ticket Registered', data);
      this._snackBar.open("Ticket Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); },
      (error) => { console.log('Failed to Register Ticket', error);
      this._snackBar.open("Failed to Register Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }

  //filter string request
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AgencyList.filter( option => option.toLowerCase().includes(filterValue));
  }

  saveTicket(){
    this.addTicket();
  }
}
