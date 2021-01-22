import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AgencyService } from 'src/app/services/agency.service';
import { Tickets } from '../../tickets';
import{ Agency } from '../../agency';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss']
})


export class ViewticketComponent implements OnInit {
  id: number | undefined;

  theTicket : any = [];
  message = '';
  customerId = 'CUSTOME581785f34f4f3';
  // agencyData = <any>[];
  tagsData = <any>[];
  agencyData : any = [];

  constructor(private service:TicketService,
    private agencyService: AgencyService,
    private route:ActivatedRoute,
    private router:Router) { }



  ngOnInit(): void {
     this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
  }

  getTicketIndividual(id:any){
    this.service.getTicketIso(id).subscribe((data)=> {
        this.theTicket = data;
        // this.agencyData = data;
        console.log(data);
      },
      error =>{console.log(error);
      }
    );
  }

  // getTags(){
  //   this.service.getTagList().subscribe(
  //     (tags)=>{
  //       this.tagsData = tags as any[];
  //     }
  //   )
  // }

//CHIPS para tags
// visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//   fruits: Fruit[] = [
//     {name: 'Lemon'},
//     {name: 'Lime'},
//     {name: 'Apple'},
//   ];

//   add(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     // Add our fruit
//     if ((value || '').trim()) {
//       this.fruits.push({name: value.trim()});
//     }

//     // Reset the input value
//     if (input) {
//       input.value = '';
//     }
//   }

//   remove(fruit: Fruit): void {
//     const index = this.fruits.indexOf(fruit);

//     if (index >= 0) {
//       this.fruits.splice(index, 1);
//     }
//   }




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

  // deleteTicket(id:number){
  //   if (confirm('Are you sure you want to abort the ticket?')){

  //   }
  // }

}
