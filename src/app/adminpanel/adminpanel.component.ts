import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  toogleedit = false;
  technicianCount:any = [];


  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.technicians();
  }

  edit(){
    this.toogleedit = !this.toogleedit;
  }

  technicians(){
    this.user.getTechnicianList().subscribe(
      data =>{ this.technicianCount = data;
      console.log(this.technicianCount)}
    );
  }

}
