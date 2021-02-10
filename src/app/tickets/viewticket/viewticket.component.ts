import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { from, Observable } from 'rxjs';
import { AgencyService } from 'src/app/services/agency.service';
import { viewTicketdata } from '../viewticket/viewticket';
import { UsersService } from 'src/app/services/users.service';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from 'src/app/interfaces/equipmentadditional.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket_equipment } from 'src/app/tickets';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss'],
  providers: [DatePipe]
})


export class ViewticketComponent implements OnInit {
  id: number | undefined;
  showEdit = false;
  
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  
  allestimento!: FormGroup;

  constructor(private service:TicketService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { 
    }
    
    public ngOnInit(): void {

      const ticketId = this.route.snapshot.paramMap.get('id');
      this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
      this.Technicians_List();
      this.getTags();
      this.allestimentoTicketList(ticketId);
      this.getUnserializedItems(ticketId);

      //datePipe


    //formgroup for steps
    this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
 
  theTicketData : any = [];
  
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

  newtags: any = [];
  getTags(){
    this.service.getTagList().subscribe(data => {
      this.newtags = data;
    });
  }
  
  TechnicianList: any = [];
  Technicians_List(){
    this.usersService.getTechnicianList().subscribe(
      data => this.TechnicianList = data
      );
  }

  events = '';

  addVisitDate(event: MatDatepickerInputEvent<Date>) {
    return this.events = (`${event.value}`);
  }
  
  technicalVisitDate: any = new Date();
  TechnicianModel: any = {
    tech_assign: '',
  assigned_Date: this.technicalVisitDate = this.datePipe.transform(this.technicalVisitDate, 'yyyy-MM-dd h:mm:ss'),
  version: 4,
  }

  technicianAssignedtoTicket(){
  this.service.assign_technician(this.TechnicianModel).subscribe(
    (data) => { this.TechnicianModel = data,
      console.log(data);
    });
}


  // Unserialized Items methods
  unserialTags: any = [];
  getUnserializedItems(id:any){
    this.service.getTicketEquipmentList(id).subscribe(
      (tag) => { this.unserialTags = tag }
      );
    }
    
    UnserializedTags = [];
  addUnserializedItem(){
      this.equipment = new Equipment();
      this.tagsarray.push(this.equipment);
  }
  
  removeUnserializedItem(index:any){
      this.tagsarray.splice(index);
  }
  
  saveSerials(){

  }

  currentTicket = null;
  currentIndex = -1;
  ticketinView: any;
    
  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  equipment_no = 0; //contador de objetos a grabar
  tagsarray: any = [];
  equipment = new Equipment();
  allestimentoEdit: Boolean = true;
  viewAllestimento: Boolean = true;
  
  addItem(id:any){//método para añadir item en el viewticket.html de Additional Equipment
    const equipment = {
      item: '',
      quantity: 1,
      ticketId: id,
    };
    this.tagsarray.push(equipment);
    console.log(equipment);
    console.log(this.tagsarray);
    console.warn();
    this.equipment_no++; //contador incrementando para saber cuantas veces grabar
    console.log(this.equipment_no);
  }
  
  saveEquipment(){
    this.tagsarray.forEach((element: any) => {
      this.service.addequipment(element).subscribe(
        (data) => { console.log('Equipment added', data);
        this._snackBar.open("Equipment added Succesfully", "OK", { duration:3500, panelClass: "success",});
      },
      (error) => { console.log('Failed to add equipment', error);
      this._snackBar.open("Failed to add equipment", "OK", { duration:3500, panelClass: "error",}); },
      )
      console.warn(element);  
    });
    this.allestimentoEdit = false;
    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
   }

  equipmentArrayData: any = [];
  allestimentoTicketList(ticketId: any){
    this.service.getTicketEquipmentList(ticketId).subscribe(
      data => {this.equipmentArrayData = data}
    );
  }

  ticketVersion =[];
  updateTicketStatus(id: any){
    const version = {
      version: 2,
      status: 'MANAGING',
      ticketId: id
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion = data;
        this._snackBar.open("Ticket has been taken in charge.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been taken in charge. Status updated')    }
    )
  }

  toogleEdit(){
    this.showEdit = !this.showEdit;
  }

  removeItem(index:any){
    this.tagsarray.splice(index, 1);
  }

  ticketStatus = []
  updateTicket(id:any){
    // this.service.updateTicket
  }

  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){

    }
  }

}
