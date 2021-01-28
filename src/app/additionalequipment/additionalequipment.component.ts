import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Equipment } from '../interfaces/equipmentadditional.model';

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
  tags: any = [];
  allestimentoControl= new FormControl;
  equipment = new Equipment()
  tagsarray: any =[];

  constructor(
    private service:TicketService,
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.tagsarray.push(this.equipment);
  }

  getTags(){
    this.service.getTagList().subscribe(
      data => this.tags = data
    );
  }

  addItem(){
    this.equipment = new Equipment();
    this.tagsarray.push(this.equipment);
  }

  removeItem(index:any){
    this.tagsarray.splice(index);
  }

  onsubmit(){

  }

  toogleEdit(){
    this.showEdit=!this.showEdit
  }

  saveAllestimento(){

  }
}
