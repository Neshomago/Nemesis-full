import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AgencyService } from 'src/app/services/agency.service';
import { Tickets }from '../../tickets';
import { TicketService } from '../../services/ticket.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss']
})
export class ViewticketComponent implements OnInit {

  // currentTicket: Tickets = {
  //   createdBy: '',
  //   type: '',
  //   customerId: '',
  //   status:'',
  //   priority:'',
  //   agencyId:'',
  //   description:'',
  //   ids: '',
  //   version: 1,
  //   creationDate: new Date(),
  //   code:'',
  // }

  currentTicket: Tickets = <any>[];

  constructor(private service:TicketService,
    private agencyService: AgencyService,
    private route:ActivatedRoute,
    private router:Router) { }



  ngOnInit(): void {
    this.getAgencyId(this.route.snapshot.paramMap.get('id'));
  }


  getAgencyId(id:any): void{
    this.agencyService.getAgency(id).subscribe(
      data=> {
        this.currentTicket = data;
        console.log();
      },
      error =>{
        console.log(error);
      }
    );

  }

}
