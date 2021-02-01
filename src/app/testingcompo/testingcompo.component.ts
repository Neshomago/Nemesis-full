import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-testingcompo',
  templateUrl: './testingcompo.component.html',
  styleUrls: ['./testingcompo.component.scss']
})
export class TestingcompoComponent implements OnInit {
  
  tags: any = [];
  
  constructor(private service:TicketService, private formBuilder:FormBuilder) { }
  
  get equipments(){
    return this.allestimentoForm.get('equipments') as FormArray;
  }

  allestimentoForm = this.formBuilder.group({
    equipments: this.formBuilder.array([])
  })

agregarEquipment(){
  const allestimentoGroup = this.formBuilder.group({
    item:'',
  });
  this.equipments.push(allestimentoGroup);
}

removeEquipment (indice : number){
  this.equipments.removeAt(indice);
}

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
   this.service.getTagList().subscribe( data =>
    {this.tags = data;});
  }

}
