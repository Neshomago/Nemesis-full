import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AgencyService } from 'src/app/services/agency.service';
import { viewTicketdata } from '../viewticket/viewticket';
import { UsersService } from 'src/app/services/users.service';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss']
})


export class ViewticketComponent implements OnInit {
  id: number | undefined;
  showEdit:boolean = false;
  theTicketData : any = [];
  TechnicianList: any = [];

  constructor(private service:TicketService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router:Router) { }



  ngOnInit(): void {
     this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
     this.Technicians_List();
  }

  getTicketIndividual(id:any):any{
    this.service.getTicketIso(id).subscribe((data)=> {
        this.theTicketData = data;
        console.log(data);
      },
      error =>{console.log(error);
      }
    );
  }

  updateAdditionalInformation(id: any){
this.service.updateTicket(id).subscribe(
  data=>this.theTicketData.description = data)
  }

  Technicians_List(){
    this.usersService.getTechnicianList().subscribe(
      data => this.TechnicianList = data
    );
  }

  showEquipment(){
    
  }




  currentTicket = null;
  currentIndex = -1;

  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }


  toogleEdit(){
    this.showEdit=!this.showEdit
  }

  // getTags(){
  //   this.service.getTagList().subscribe(
  //     (tags)=>{
  //       this.tagsData = tags as any[];
  //     }
  //   )
  // }

  // setAvailableStatus(stat): void{
  //   const data = {
  //     createdBy: this.currentTicket.createdBy,
  //     type: this.currentTicket.type,
  //     customerId: this.currentTicket.customerId,
  //     creationDate: this.currentTicket.creationDate,
  //     status: this.currentTicket.status,
  //     priority: this.currentTicket.priority,
  //     agencyId: this.currentTicket.agencyId,
  //     description: this.currentTicket.description,
  //     ids: this.currentTicket.ids,
  //     version: this.currentTicket.version,
  //    //  code:string;
  //     id: this.currentTicket.id,
  //     available: stat
  //   };

  // }

  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){

    }
  }

}
