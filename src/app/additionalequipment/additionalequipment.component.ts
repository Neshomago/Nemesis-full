import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { TicketService } from '../services/ticket.service';

export interface Fruit {
  name: string;
}

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

  constructor(
    private service:TicketService,
  ) {
    
  }
  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    return this.service.getTagList().subscribe(
      tag => this.tags = tag
    )
  }

  toogleEdit(){
    this.showEdit=!this.showEdit
  }

  saveAllestimento(){

  }
}
