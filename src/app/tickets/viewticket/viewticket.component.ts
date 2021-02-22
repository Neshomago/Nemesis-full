import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Equipment } from 'src/app/interfaces/equipmentadditional.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


/* PDF IMPORTING TO SAVE*/
import { ElementRef} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewChild } from '@angular/core';


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

  theTicketData : any;
  newtags: any = [];
  TechnicianList: any = [];
  unserialTags: any = [];
  warehouseData:any = [];
  tagsarray: any = [];
  equipment = new Equipment();
  allestimentoEdit: Boolean = true;
  viewAllestimento: Boolean = true;
  equipmentArrayData: any = [];
  ticketVersion ={ version: 1, status: ''};

  //currentTicket = null;
  currentIndex = -1;
  //ticketinView: any;

  theTicketUpdate: any = {
    agencyId: '',
    code: '',
    priority:'',
    description:'',
    type:''
  };

  agencyToUpdate: any = {
    name:'',
    certification:'',
    address:'',
    phone:'',
    email:'',
    managerId:''
  };

  tickStatus ={ status:'ABORTED'};
  customerId = 'CUSTOME581785f34f4f3';
  AgencyList: any = [];
  FilteredAgency: any = [];

  technicalVisitDate:any = (this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss'));
  TechnicianModel: any = {
  tech_assign: '',
  // assignedDate: this.datePipe.transform(this.technicalVisitDate, 'yyyy-MM-dd h:mm:ss'),
  assignedDate: this.technicalVisitDate,
  version: 5,
  }

  constructor(private service:TicketService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { 
    }
    
    public ngOnInit(): void {

      const ticketId = this.route.snapshot.paramMap.get('id');
      this.getAgencyListName();
      this.getUnserializedItems(ticketId);
      // initialize the current ticket ID
      this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
      
      //Load from database all the fields required according to each step
      this.Technicians_List();
      this.getTags();
      this.allestimentoTicketList(ticketId);
      this.getWarehouseStock();
      // this.getTicketInfotoUpdate(ticketId);

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
 
    // customerId = 'CUSTOME581785f34f4f3';
  // AgencyList: any = [];
  getAgencyListName(){
    this.service.getAgencyName(this.customerId).subscribe(agency => {
      this.AgencyList = agency;
    })
  }


  // Getting General Ticket Information
  // theTicketData : any = [];
  // agencyToUpdate: any = {
  //   name:'',
  //   certification:'',
  //   address:'',
  //   phone:'',
  //   email:'',
  //   managerId:''
  // };
  getTicketIndividual(id:any):any{
    this.service.getTicketIso(id).subscribe((data)=> {
      this.theTicketData = data[0];
      this.theTicketUpdate.agencyId = data[0].agencyId;
      this.theTicketUpdate.code = data[0].code;
      this.theTicketUpdate.type = data[0].type;
      this.theTicketUpdate.description = data[0].description;
      this.theTicketUpdate.priority = data[0].priority;
      let agenciaSelected:any = this.AgencyList.find((a:any) => a.id === parseInt(this.theTicketUpdate.agencyId, 10));
      this.agencyToUpdate.name = agenciaSelected.name;
    },
    error =>{console.log(error);
    });
  }

  // newtags: any = [];
  getTags(){
    this.service.getTagList().subscribe(data => {
      this.newtags = data;
    });
  }
  
  // TechnicianList: any = [];
  Technicians_List(){
    this.usersService.getTechnicianList().subscribe(
      data => this.TechnicianList = data
      );
  }

  technicianAssignedtoTicket(id:any){
  this.service.assign_technician(id,this.TechnicianModel).subscribe(
    (data) => { 
      this.TechnicianModel = data;
      this._snackBar.open("Technician Assigned Succesfully", "OK", { duration:3500, panelClass: "success",});
      console.log(data);
    });
    this.refreshPage();
}

  // Unserialized Items methods
  // unserialTags: any = [];
  getUnserializedItems(id:any){
    this.service.getTicketEquipmentList(id).subscribe(
      (tag) => { this.unserialTags = tag;
        console.log("datos a serializar: ",this.unserialTags);
      }
      );
  }

  // warehouseData:any = [];
  getWarehouseStock(){
    this.service.getWarehouseNameQuantity().subscribe(
      data => { this.warehouseData = data}
      );
      console.log(this.warehouseData);
    }

  saveSerials(){
    let i= 0;

    this.unserialTags.forEach((element: any) => {
        this.service.saveSerialsOfItems(element.id, element).subscribe(
          (data) => { 
            console.log('Equipment added', data);
          this._snackBar.open("Equipment Serialized Succesfully", "OK", { duration:3500, panelClass: "success",});
          if (this.unserialTags.length == (i+1)){

            this.allestimentoTicketList(element.ticketId);
          }
          i++;
        },
        (error) => { console.log('Failed to add equipment', error);
        this._snackBar.open("Failed to Serialize equipment", "OK", { duration:3500, panelClass: "error",}); },
        )
        console.warn(element);  
      });
  }
  
  addItem(id:any){//método para añadir item en el viewticket.html de Additional Equipment
    const equipment = {
      item: '',
      quantity: 1,
      ticketId: id,
    };
    this.tagsarray.push(equipment);
    console.log(this.tagsarray);
  }


  saveEquipment(){
    let i=0;

    this.tagsarray.forEach((element: any) => {
      this.service.addequipment(element).subscribe(
        (data) => { console.log('Equipment added', data);
        this._snackBar.open("Equipment added Succesfully", "OK", { duration:3500, panelClass: "success",});
        if (this.tagsarray.length == (i+1)){

          this.allestimentoTicketList(element.ticketId);
        }
        i++;
      },
      (error) => { console.log('Failed to add equipment', error);
      this._snackBar.open("Failed to add equipment", "OK", { duration:3500, panelClass: "error",}); },
      
      )
      console.warn(element);  
    });
    this.allestimentoEdit = false;
  }

  updateEquipment(){
    let i=0;

    this.equipmentArrayData.forEach((element: any) => {
      this.service.updateEquipment(element.id, element).subscribe(
        (data) => { 
          this.equipmentArrayData.item = this.equipmentArrayData.item;
          this.equipmentArrayData.ticketId = this.equipmentArrayData.ticketId;
          // console.log('Equipment updated', data);
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        if (this.equipmentArrayData.length == (i+1)){

          this.allestimentoTicketList(element.ticketId);
        }
        i++;
      },
      (error) => { console.log('Failed to add equipment', error);
      this._snackBar.open("Failed to add equipment", "OK", { duration:3500, panelClass: "error",}); },
      
      )
      console.warn(element);  
    });
    this.showEdit2 = false;
  }


  refreshPage() {window.location.reload();}

  // equipmentArrayData: any = [];
  allestimentoTicketList(ticketId: any){
    this.service.getTicketEquipmentList(ticketId).subscribe(
      data => {this.equipmentArrayData = data;
      console.log(this.equipmentArrayData);}
    );
  }


  // Updating Ticket Version on each step
  // ticketVersion = { version: null, status: ''};
  updateTicketStatus2(id: any){
    const version = {
      version: 2,
      status: 'MANAGING',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 2;
        this.theTicketData.status = 'MANAGING';
        this._snackBar.open("Ticket has been updated. Continue in step 3.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been updated. Continue in step 3', data);}
    );
  }

  updateTicketStatus3(id: any, i:number){
    const version = {
      version: 3,
      status: 'MANAGING',
    }
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 3;
        this._snackBar.open("Ticket has been updated. Proceedo to serialize.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket has been taken in charge. Status updated', data)    }
    );
  }

  updateTicketStatus4(id: any, i:number){
    const version = {
      version: 4,
      status: 'WORKING',
    };
    this.service.updateTicketVersion(id, version).subscribe(
      (data) => { this.theTicketData.version = 4;
        this._snackBar.open("Ticket is now in Working status.", "OK", { duration:3500, panelClass: "success",});
        console.log('Ticket is now been worked. Status updated', data)    }
    );
  }

  //Toggle Edition fields in Html view
  toogleEditstep1(){ this.showEdit1 = !this.showEdit1;}

  toogleEditstep2(){this.showEdit2 = !this.showEdit2;}

  toogleEditstep3(){this.showEdit3 = !this.showEdit3;}

  toogleEditstep4(){this.showEdit4 = !this.showEdit4;}

  removeItem(index:any){this.tagsarray.splice(index, 1); }

  //
  // theTicketUpdate: any = [];


  getTicketInfotoUpdate(id:any){
    this.service.getTickettoUpdate(id).subscribe(
      data => { this.theTicketUpdate = data;
      console.log("The Ticket Update: ", this.theTicketUpdate)}
    );
  }

  updateTicket(id:any){
    this.service.updateTicket(id, this.theTicketUpdate).subscribe(
      (data) => { 
        this.theTicketData.code = this.theTicketUpdate.code;
        this.theTicketData.type = this.theTicketUpdate.type;
        this.theTicketData.priority = this.theTicketUpdate.priority;
        this.theTicketData.description = this.theTicketUpdate.description;
        this.theTicketData.agencyId = this.theTicketUpdate.agencyId;
        this._snackBar.open(data, "OK", 
        { duration:3500, panelClass: "success",});
      });
      this.showEdit1 = false;
  }

  agencyListBindUpdate(){
    let agenciaSelected:any = this.AgencyList.find((a:any) => a.id === parseInt(this.theTicketUpdate.agencyId, 10));
    console.log("datos agenciaSelected: ", agenciaSelected);
    this.theTicketData.managerId = agenciaSelected.managerId;
    this.theTicketData.address = agenciaSelected.address;
    this.theTicketData.certification = agenciaSelected.certification;
    this.theTicketData.name = agenciaSelected.name;
    this.theTicketData.phone = agenciaSelected.phone;
    this.theTicketData.email = agenciaSelected.email;
  }

  // tickStatus ={ status:'ABORTED'};
  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){
        this.service.deleteTicket(id, this.tickStatus).subscribe(
          (data) => { this.tickStatus = data;
            this._snackBar.open("Ticket Aborted Succesfully", "OK", { duration:3500, panelClass: "success",});
            this.router.navigateByUrl("/tickets");
          });
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
    );
  }

  updateTechnician(id:any){
    this.service.assign_technician(id,this.TechnicianModel).subscribe(
      (data) => { 
        this.TechnicianModel = data;
        this._snackBar.open("Technician Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      });
      this.refreshPage();
  }


  /** PDF TESTING **/
  @ViewChild('dataPdf')
  dataPdf!: ElementRef;
  
  filename= "TcktNm_Tid";
  
  ddtDownload(): void{
    let DATA = document.getElementById('dataPdf');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('DDT_Download'+ this.filename +this.theTicketData.id+'.pdf');
    });     
  }
}