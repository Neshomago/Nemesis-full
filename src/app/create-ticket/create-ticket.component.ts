import { Component, OnInit } from '@angular/core';
import { TicketService} from '../services/ticket.service';
import { Tickets} from '../tickets';
import { FormControl } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Router} from '@angular/router';
import { AgencyService } from '../services/agency.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  customerId = localStorage.getItem('customerId');
  creatorId: any;

    ticketModel: Tickets = {
    createdBy: '',
    type: '',
    customerId: String(this.customerId),
    status:'OPENED',
    priority:'',
    agencyId:'',
    description:'',
    ids: '',
    version: 1,
    code:'',
  }

  valueSelected:any;

  myControl = new FormControl();
  AgencyList: any = [];
  arregloAutocompletar:any = [];

  filteredOptions!: Observable<any[]>;
  
  constructor(private ticketService:TicketService,
    private agencyService: AgencyService,
    private _snackBar:MatSnackBar, private router:Router) {
    if(localStorage.getItem('id')) {
      this.creatorId = localStorage.getItem('id');
    }
   }
  
  ngOnInit(): void {
    this.getAgencyName();
    console.log("customerId al crear ticket: ",this.customerId);
    // this.filteredOptions = this.myControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }

  getAgencyName(){
    let zrole = localStorage.getItem('zRoleA');
    if(!zrole){
      this.ticketService.getAgencyName(String(this.customerId)).subscribe(agency => {
        this.AgencyList = agency;
        this.arregloAutocompletar = this.AgencyList;
        console.log("Not: ", this.AgencyList);
      });
    } else {
        this.agencyService.getAgencyList().subscribe(data => 
          { this.AgencyList = data;
            this.arregloAutocompletar = this.AgencyList;
            console.log("Yes: ",this.AgencyList);
          });
    }
  }

  // private _filter(value: any): any[] {
  //   const filterValue = value.toLowerCase();
  //   console.log(this.AgencyList);

  //   return this.AgencyList.filter((option:any) => 
  //   option.name.toLowerCase().includes(filterValue) || 
  //   option.id.toLowerCase().includes(filterValue) ||
  //   option.managerId.toLowerCase().includes(filterValue)
  //   );
  // }

  filteredString: string = '';
  filter = false;
  filteredResult: any = [];
  onSearchTerm(agency:any){

    const busqueda = agency;
    console.log("data agencia: ",busqueda);

    
    if (this.valueSelected == 'NAME'){
      let resp: any = this.AgencyList.filter( (option:any) => 
      option.name.toLowerCase().includes(busqueda.toLowerCase()));
      if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      }
      // console.log("respu: ",resp);
    } else if (this.valueSelected ==='AAMS'){
      let resp: any = this.AgencyList.filter( (option:any) => 
      option.managerId.toLowerCase().includes(busqueda));
      if (resp != null || resp != undefined || resp != "" || resp != []){
        this.filter = true;
        this.filteredResult = resp;
        return resp;
      }
      // console.log("respu: ",resp);
    }

    // let resp: any = this.arregloAutocompletar.filter(
    //   (item:any) => item.name.toLowerCase().indexOf(this.filteredString.toLowerCase()) !== -1);

    //     if (resp != null || resp != undefined || resp != "" || resp != []){
    //       this.filter = true;
    //       this.filteredResult = resp;
    //       // return resp;
    //     }
    //     if (resp == "" || resp == null || resp == undefined || resp === [] || resp==='' || resp=="clear"){
    //         this.filteredResult = [];
    //         this.filter = false;
    //     }
  }
    
  addTicket(){
    this.ticketModel.createdBy = String(localStorage.getItem('id'));
    this.ticketService.addTicket(this.ticketModel).subscribe(
      (data) => { 
        console.log("valor de ticketmodel CreatedBy", this.ticketModel.createdBy)
        console.log('Ticket Registered', data);
      this._snackBar.open("Ticket Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
      this.router.navigateByUrl("/tickets"); },
      (error) => { console.log('Failed to Register Ticket', error);
      this._snackBar.open("Failed to Register Ticket", "OK", { duration:3500, panelClass: "error",}); },
    )
    console.warn(this.ticketModel);
  }

  saveTicket(){
    this.addTicket();
  }
}
