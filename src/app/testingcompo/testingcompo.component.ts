import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-testingcompo',
  templateUrl: './testingcompo.component.html',
  styleUrls: ['./testingcompo.component.scss']
})
export class TestingcompoComponent implements OnInit {
  
  tags: any = [];
  
  constructor(private service:TicketService,) { }
  
  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
   this.service.getTagList().subscribe( data =>
    {this.tags = data;});
  }

}
