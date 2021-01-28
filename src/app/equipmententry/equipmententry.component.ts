import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Equipment } from '../interfaces/equipmentadditional.model';

@Component({
  selector: 'app-equipmententry',
  templateUrl: './equipmententry.component.html',
  styleUrls: ['./equipmententry.component.scss']
})
export class EquipmententryComponent implements OnInit {

  equipment = new Equipment()
  tagsarray: any =[];
  tags: any = [];
  constructor(
    private service:TicketService,
  ) { }

  ngOnInit(): void {
    this.getTags();
    this.tagsarray.push(this.equipment);
  }

  getTags(){
    this.service.getTagList().subscribe(
      (tag) => this.tags = tag
    )
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
}
