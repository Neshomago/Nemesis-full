import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TicketService } from '../services/ticket.service';
import { UsersService } from '../services/users.service';
import { WarehouseService } from '../services/warehouse.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clientsCount: any;
  ticketCount :any;
  warehouseCount:any;
  technicianCount:any;

  constructor(
    private tkservice:TicketService,
    private cuservice:CustomerService,
    private user: UsersService,
    private warehouse: WarehouseService) {}

  ngOnInit(): void {
    this.total_clients();
    this.no_tickets();
    this.technicians();
    this.warehouse_status();
  }

  ValueA = 0;
  ValueB = 0;
  ValueC = 0;
  ValueT = 0;
  TotalAdminInst = 0;
  TotalAdminDis = 0;
  TotalAdminInt = 0;
  TotalTicketsWorked = 0;
  TotalRevenue = 0;
  
  no_tickets(){
    let ins = 0;
    let dis = 0;
    let int = 0;
    let adminInst = 0;
    let adminDis = 0;
    let adminInt = 0;
    let revenueAdmin = 0;
    let TicketIns=0;
    let TicketDis=0;
    let TicketInt=0;

  this.tkservice.getTicketList().subscribe(
  data => {this.ticketCount = data;
    for ( let i = 0; i < this.ticketCount.length; i++) {
      if (this.ticketCount[i].type =='INS'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'INS') {
          ins++;
        }
        adminInst++;
      }
      else if (this.ticketCount[i].type == 'DIS'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'DIS') {
          dis++;
          console.log("dis technician: "+dis);
        }
        adminDis++;
        console.log("Total Dis: "+adminDis);
      }
      else if(this.ticketCount[i].type == 'INT'){
        if(this.ticketCount[i].status == 'RESOLVED' && this.ticketCount[i].type == 'INT') {
        int++;
        }
        adminInt++;
    }
    }
    TicketIns = ins * 100;
    TicketDis = dis * 50;
    TicketInt = int * 35;
    let Total = TicketInt + TicketDis + TicketIns;
    this.ValueA = TicketIns;
    this.ValueB = TicketDis;
    this.ValueC = TicketInt;
    this.ValueT = Total;
    this.TotalAdminInst = adminInst * 200;
    this.TotalAdminDis = adminDis * 100;
    this.TotalAdminInt = adminInt * 70;
    this.TotalTicketsWorked = this.TotalAdminInst + this.TotalAdminDis + this.TotalAdminInt;
    this.TotalRevenue = this.TotalTicketsWorked - this.ValueT;
  });
  }

  total_clients(){
    this.cuservice.getCustomerList().subscribe(
      data => { this.clientsCount = data;
    });
  }

  technicians(){
    this.user.getTechnicianList().subscribe(
      data =>{ this.technicianCount = data;
      console.log(this.technicianCount)}
    );
  }

  warehouse_status(){

  }
}
