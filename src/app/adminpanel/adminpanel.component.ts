import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  toogleedit = false;
  constructor() { }

  ngOnInit(): void {
  }

  edit(){
    this.toogleedit = !this.toogleedit;
  }

}
