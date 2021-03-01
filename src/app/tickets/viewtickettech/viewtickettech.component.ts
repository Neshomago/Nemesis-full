import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket.service';
import {AgencyService} from 'src/app/services/agency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewtickettech',
  templateUrl: './viewtickettech.component.html',
  styleUrls: ['./viewtickettech.component.scss']
})
export class ViewtickettechComponent implements OnInit {

  constructor(private service:TicketService, private agencyService: AgencyService,
    public dialog:MatDialog, private _snackBar: MatSnackBar) { }

  TicketList:any=[];
  AgencyList:any=[];
  currentTicket = null;
  currentIndex = -1;

  theTicketData : any;

  public FilterValue: any;
  FilteredResult:any = [];

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

  refreshPage() {window.location.reload();}

  TicketReject(id: any){
    const version = {
      tech_assign: '',
      version: 4,
      status: 'WORKING',
    };
    this.service.updateTicketReject(id, version).subscribe(
      (data) => { this.theTicketData.version = 4;
        this._snackBar.open("Ticket has been returned.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been returned. Status updated', data)    }
    );
    this.refreshPage();
  }

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  
  filtering = false;
  onSelectedFilter(){
    this.FilteredResult = this.TicketList.filter(
      (ticket:any) => (ticket.status === this.FilterValue || ticket.type == this.FilterValue || ticket.priority == this.FilterValue));
    this.filtering = true;
    if (this.FilterValue == "clear"){
      this.filtering = false;
      this.FilteredResult = [];
    }
  }
}
