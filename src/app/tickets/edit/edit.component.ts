import { Component, OnInit } from '@angular/core';
import { TicketService} from '../../services/ticket.service';
import { Tickets, Ticket_update } from '../../../app/tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
  
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  customerId = 'CUSTOME581785f34f4f3';
  
  ticketModel: Ticket_update = {
    status:'',
    description:'',
    tech_assign:'',
    assigned_tags:'',
    assignedDate: new Date(),
  }
  
  constructor(private ticketService:TicketService, private _snackBar:MatSnackBar, private router:Router, private route:ActivatedRoute) { }
  theTicketData : any = [];
  myControl = new FormControl();
  AgencyList: any = [];
  
  ngOnInit(): void {
 //   this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
  }

  //id: number

    
  UpdateTicket(){
    this.ticketService.updateTicket(this.ticketModel).subscribe(
      (data) => { console.log('Ticket Updated Successfully', data);
      this._snackBar.open("Ticket Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/tickets"); },
      (error) => { console.log('Failed to Update Ticket', error);
      this._snackBar.open("Failed to Update Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }
  
  saveTicket(){
    this.UpdateTicket();
  }

  getTicketIndividual(id:any):any{
    this.ticketService.getTicketIso(id).subscribe((data)=> {
        this.theTicketData = data;
        console.log(data);
      },
      error =>{console.log(error);
      }
    );
  }

  currentTicket = null;
  currentIndex = -1;

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }


  }
  
  