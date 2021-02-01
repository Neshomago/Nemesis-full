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


@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.scss']
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
    private router:Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }
    
    
    
    ngOnInit(): void {

      this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
      this.Technicians_List();
      this.getTags();
      this.getUnserializedItems();
      this.tagsarray.push(this.equipment);

      this.allestimento = this._formBuilder.group({
        items: this._formBuilder.array([
          this._formBuilder.group({item: ['']})
        ])
      });
    
      
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
 

  get getallestimento(){
    return this.allestimento.get('items') as FormArray;
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


  // Unserialized Items methods
  unserialTags: any = [];
  UnserializedTags = [];
  getUnserializedItems(){
    this.service.get_equipment().subscribe(
      (tag) => this.unserialTags = tag
      )
    }

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
    
    setCurrentTicket(ticket:any, index:any): void{
      this.currentTicket = ticket;
      this.currentIndex = index;
    }
    
    additionals: Equipment = {
      item: '',
      quantity:'1',
      ticketId: undefined
    }
  
  tagsarray: any =[];
  equipment = new Equipment()
  
  addItem(){
        this.equipment = new Equipment();
        this.tagsarray.push(this.equipment);
  }




  saveEquipment(){
    this.service.addequipment(this.additionals).subscribe(
      (data) => { console.log('Equipment added', data);
        this._snackBar.open("Equipment added Succesfully", "OK", { duration:3500, panelClass: "success",});
        },
        (error) => { console.log('Failed to add equipment', error);
        this._snackBar.open("Failed to add equipment", "OK", { duration:3500, panelClass: "error",}); },
      )
      console.warn(this.equipment);
  }

  toogleEdit(){
    this.showEdit = !this.showEdit;
  }

  removeItem(index:any){
    // this.tagsarray.splice(index);
    this.tagsarray.removeAt(index);
  }

  updateTicket(){

  }

  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){

    }
  }

}
