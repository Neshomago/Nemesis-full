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
      this.getWarehouseStock();

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
  addVisitDate() {

  }
  
  technicalVisitDate: any = Date();
  TechnicianModel: any = {
  tech_assign: '',
  assignedDate: this.technicalVisitDate = this.datePipe.transform(this.technicalVisitDate, 'yyyy-MM-dd h:mm:ss'),
  version: 4,
  }

  technicianAssignedtoTicket(id:any){
  this.service.assign_technician(id,this.TechnicianModel).subscribe(
    (data) => { 
      this.TechnicianModel = data;
      this._snackBar.open("Technician Assigned Succesfully", "OK", { duration:3500, panelClass: "success",});
      console.log(data);
    });
    this.updateTicketStatus4(id);
    this.refreshPage();
}

  // Unserialized Items methods
  unserialTags: any = [];
  getUnserializedItems(id:any){
    this.service.getTicketEquipmentList(id).subscribe(
      (tag) => { this.unserialTags = tag }
      );
  }

  warehouseData:any = [];
  getWarehouseStock(){
    this.service.getWarehouseNameQuantity().subscribe(
      data => { this.warehouseData = data}
      );
      console.log(this.warehouseData);
    }
  
  //   UnserializedTags = [];
  // addUnserializedItem(){
  //     this.equipment = new Equipment();
  //     this.tagsarray.push(this.equipment);
  // }
  
  removeUnserializedItem(index:any){
      this.tagsarray.splice(index);
  }
  

  saveSerials(ticketId:any){
      this.unserialTags.forEach((element: any) => {
        this.service.saveSerialsOfItems(ticketId, element).subscribe(
          (data) => { console.log('Equipment added', data);
          this._snackBar.open("Equipment Serialized Succesfully", "OK", { duration:3500, panelClass: "success",});
        },
        (error) => { console.log('Failed to add equipment', error);
        this._snackBar.open("Failed to Serialize equipment", "OK", { duration:3500, panelClass: "error",}); },
        )
        console.warn(element);  
      });
      this.allestimentoEdit = false;
      this.refreshPage();
  }

  currentTicket = null;
  currentIndex = -1;
  ticketinView: any;
    
  setCurrentTicket(ticket:any, index:any): void{
    this.currentTicket = ticket;
    this.currentIndex = index;
  }

  // equipment_no = 0; //contador de objetos a grabar
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
    // this.equipment_no++; //contador incrementando para saber cuantas veces grabar
    // console.log(this.equipment_no);
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

  ticketVersion2 =[];
  updateTicketStatus2(id: any){
    const version = {
      version: 2,
      status: 'MANAGING',
      ticketId: id
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion2 = data;
        console.log('Ticket has updated to continur in step 3');}
    );
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
  updateTicketStatus3(id: any){
    const version = {
      version: 3,
      status: 'MANAGING',
      ticketId: id
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion = data;
        this._snackBar.open("Ticket has been taken in charge.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been taken in charge. Status updated')    }
    )
  }

  updateTicketStatus4(id: any){
    const version = {
      version: 4,
      status: 'WORKING',
      ticketId: id
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion = data;
        this._snackBar.open("Ticket is now Working status.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket is now been worked. Status updated')    }
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
