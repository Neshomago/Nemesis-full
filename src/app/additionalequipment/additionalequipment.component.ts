import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Equipment } from '../interfaces/equipmentadditional.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'additionalequipment',
  templateUrl: './additionalequipment.component.html',
  styleUrls: ['./additionalequipment.component.scss']
})
export class AdditionalequipmentComponent implements OnInit{

  showEdit:boolean = false;
  selectbyname: any = [];
  selectedItemdescription: any = [];
  tagSelected: string | undefined;
  allestimentoControl= new FormControl;
  equipment = new Equipment()
  tagsarray: any =[];
  
  additionals: Equipment = {
    item: '',
    quantity:'1',
    ticketId: undefined
  }
  item_add = 1;

  constructor(
    private service:TicketService, private _snackBar: MatSnackBar
    ) {}
    
  ngOnInit(): void {
      this.getTags();
      this.tagsarray.push(this.equipment);
  }
  
  newtags: any = [];
    
  getTags(){
    this.service.getTagList().subscribe(data => {
      this.newtags = data;
    });
  }

  addItem(){
    this.equipment = new Equipment();
    this.tagsarray.push(this.equipment);
    this.item_add++;
  }

  removeItem(index:any){
    this.tagsarray.splice(index);
  }

  onsubmit(){

  }

  toogleEdit(){
    this.showEdit=!this.showEdit
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
}
