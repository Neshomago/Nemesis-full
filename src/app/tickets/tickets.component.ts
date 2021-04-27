import { Component, OnInit } from '@angular/core';
import {TicketService} from 'src/app/services/ticket.service';
import {AgencyService} from 'src/app/services/agency.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MassiveticketsComponent } from './massivetickets/massivetickets.component';
import { tick } from '@angular/core/testing';


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
       let result = this.TicketList.map((a:any) => a.creationDate);
       console.log("solo fechas: ", result);
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
  }

  openDialogExcelBox(){
    this.dialog.open(MassiveticketsComponent);
  }

  filtering = false;
  onSelectedFilter(){
    this.FilteredResult = this.TicketList.filter(
      (ticket:any) => (ticket.status === this.FilterValue
        || ticket.type == this.FilterValue 
        || ticket.priority == this.FilterValue 
        || ticket.creationDate == this.FilterValue
        
        ));
    this.filtering = true;
    if (this.FilterValue == "clear"){
      this.filtering = false;
      this.FilteredResult = [];
    }
  }

  onSelectedMonth(){
    
    this.FilterValue == "jan"
    this.FilterValue == "feb"
    this.FilterValue == "mar"
    this.FilterValue == "apr"
    this.FilterValue == "may"
    this.FilterValue == "jun"
    this.FilterValue == "jul"
    this.FilterValue == "aug"
    this.FilterValue == "sep"
    this.FilterValue == "oct"
    this.FilterValue == "nov"
    this.FilterValue == "dec"

    let a = this.TicketList[0].creationDate;
    console.log("mes a mostrar general: ",a);

  }

  limpiarFiltro(){
    this.filtering = false;
    this.FilterValue="";  
    this.FilteredResult = [];
  }

  onValueChange(date:Date) {
    var monthData = this.TicketList.filter(
      (x:any) => x.currentDate &&  new Date(x.date).getMonth() == date.getMonth()
    );
    console.log(monthData);

    // this.getDisplayData(monthData);
  }

  // getDisplayData(inputData) {
  //   this.resultData = [];
  //   let data = new Set(
  //     inputData.map(item => this.datePipe.transform(item.date, "yyyy-MM"))
  //   );
  //   Array.from(data)
  //     .sort()
  //     .forEach(date => {
  //       this.resultData.push({
  //         date: date,
  //         bug: this.products.filter(
  //           i => this.datePipe.transform(i.date, "yyyy-MM") === date
  //         )
  //       });
  //     });
  // }
}
