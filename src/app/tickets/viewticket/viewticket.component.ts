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
  showEdit1 = false;
  showEdit2 = false;
  showEdit3 = false;
  showEdit4 = false;
  
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  
  allestimento!: FormGroup;


  technicalVisitDate:any = new Date();
  TechnicianModel: any = {
  tech_assign: '',
  assignedDate: this.technicalVisitDate,
  version: 4,
  }

  constructor(private service:TicketService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { 
    }
    
    public ngOnInit(): void {

      // initialize the current ticket ID
      const ticketId = this.route.snapshot.paramMap.get('id');
      this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
      
      //Load from database all the fields required according to each step
      this.Technicians_List();
      this.getTags();
      this.allestimentoTicketList(ticketId);
      this.getUnserializedItems(ticketId);
      this.getWarehouseStock();
      this.getAgencyName();

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
 
  // Getting General Ticket Information
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
  
  //
  // updateAdditionalInformation(id: any){
  //   this.service.updateTicket(id).subscribe(
  //     data=>this.theTicketData.description = data)
  // }

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
  

  technicianAssignedtoTicket(id:any){
  this.updateTicketStatus4(id);

  this.service.assign_technician(id,this.TechnicianModel).subscribe(
    (data) => { 
      this.TechnicianModel = data;
      this._snackBar.open("Technician Assigned Succesfully", "OK", { duration:3500, panelClass: "success",});
      console.log(data);
    });
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
  

  saveSerials(id: any){
    let unserial = this.unserialTags.length;

      unserial.forEach((element: any) => {
        this.service.saveSerialsOfItems(id, element).subscribe(
          (data) => { console.log('Equipment added', data);
          this._snackBar.open("Equipment Serialized Succesfully", "OK", { duration:3500, panelClass: "success",});
        },
        (error) => { console.log('Failed to add equipment', error);
        this._snackBar.open("Failed to Serialize equipment", "OK", { duration:3500, panelClass: "error",}); },
        )
        console.warn(element);  
      });
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
      item_description:'',
      quantity: 1,
      ticketId: id,
    };
    this.tagsarray.push(equipment);
    console.log(equipment);
    console.log(this.tagsarray);
    // this.equipment_no++; //contador incrementando para saber cuantas veces grabar
    // console.log(this.equipment_no);
  }
  
  allestimento_save(ticketId:any){
    this.updateTicketStatus2(ticketId);
    this.saveEquipment();
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

  refreshPage() {window.location.reload();}

  equipmentArrayData: any = [];
  allestimentoTicketList(ticketId: any){
    this.service.getTicketEquipmentList(ticketId).subscribe(
      data => {this.equipmentArrayData = data}
    );
  }


  // Updating Ticket Version on each step
  ticketVersion =[];
  updateTicketStatus2(id: any){
    const version = {
      version: 2,
      status: 'MANAGING',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion = data;
        console.log('Ticket has updated to continue in step 3');}
    );
  }

  updateTicketStatus3(id: any){
    const version = {
      version: 3,
      status: 'MANAGING',
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
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.ticketVersion = data;
        this._snackBar.open("Ticket is now Working status.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket is now been worked. Status updated')    }
    )
  }

  //Toggle Edition fields in Html view
  toogleEditstep1(){ this.showEdit1 = !this.showEdit1;}

  toogleEditstep2(){this.showEdit2 = !this.showEdit2;}

  toogleEditstep3(){this.showEdit3 = !this.showEdit3;}

  toogleEditstep4(){this.showEdit4 = !this.showEdit4;}

  removeItem(index:any){this.tagsarray.splice(index, 1); }

  //
  theTicket: any = [];
  updateTicket(id:any){
    const theTicket =
    {
      code:'',
      type:'',
      priority:'',
      agencyId:undefined,
      description: ''
    }
    this.service.updateTicket(id, theTicket).subscribe(
      (data) => { this.theTicket = data;
      console.log('Ticket has had some changes. Updated')}
    );
  }

  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){

    }
  }

  deleteOneItemEquipment(id:number){
    this.service.deleteItemEquipment(id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }


  customerId = 'CUSTOME581785f34f4f3';
  AgencyList: any = [];
  getAgencyName(){
    this.service.getAgencyName(this.customerId).subscribe(agency => {
      this.AgencyList = agency;
    })

  }

}
