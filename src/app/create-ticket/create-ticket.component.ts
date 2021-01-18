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

  customerId = 'CUSTOME581785f34f4f3';
  //filteredAgencies: Observable<any[]> | undefined;

    ticketModel: Tickets = {
    createdBy: 'CUSTOME581785f34f4f3',
    type: '',
    customerId: 'CUSTOME581785f34f4f3',
    //creationDate: new Date(),
    status:'OPENED',
    priority:'',
    agencyId:'',
    description:'',
    ids: '789461',
    version: 1,
    // code:'',
  }
  
  constructor(private ticketService:TicketService, private _snackBar:MatSnackBar, private router:Router) { }
  
  ngOnInit(): void {
    this.getAgencyName();


    // this.filteredAgencies = this.myControl.valueChanges.pipe(startWith(''),map(value=> this._filter(value)))
 
  }
  myControl = new FormControl();
  AgencyList: any = [];

  getAgencyName(){
    this.ticketService.getAgencyName(this.customerId).subscribe(agency => {
      this.AgencyList = agency;
    })

  }
    
  addTicket(){
    this.ticketService.addTicket(this.ticketModel).subscribe(
      (data) => { console.log('Ticket Registered', data);
      this._snackBar.open("Ticket Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/viewticket/"); },
      (error) => { console.log('Failed to Register Ticket', error);
      this._snackBar.open("Failed to Register Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }

  saveTicket(){
    this.addTicket();
  }

  //filter string request
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.AgencyList.filter( option => option.toLowerCase().includes(filterValue));
  // }
}
