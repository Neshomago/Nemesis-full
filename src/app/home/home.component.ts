import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TicketService } from '../services/ticket.service';
import { UsersService } from '../services/users.service';
import { WarehouseService } from '../services/warehouse.service';
// import { map } from 'rxjs/operators';
// import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Opened Tickets', cols: 1, rows: 1 },
  //         { title: 'Total of Clients', cols: 1, rows: 1 },
  //         { title: 'Technicians', cols: 1, rows: 1 },
  //         { title: 'Warehouse', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Opened Tickets', cols: 1, rows: 1 },
  //         { title: 'Total of Clients', cols: 1, rows: 1 },
  //         { title: 'Technicians', cols: 1, rows: 1 },
  //         { title: 'Warehouse', cols: 1, rows: 1 }
  //     ];
  //   })
  // );
  clientsCount: any;
  ticketCount :any;
  warehouseCount:any;
  technicianCount:any;

  constructor(
   // private breakpointObserver: BreakpointObserver,
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

  no_tickets(){
  this.tkservice.getTicketList().subscribe(
  data => {this.ticketCount = data}
  );
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
