import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:SharedService, private fb:FormBuilder) { }

  Contact:any = [];

  ngOnInit(): void {
    this.refreshContactList();
  }

  refreshContactList(){
    this.contactService.getContactList().subscribe(
      data => {
        this.Contact = data
      }
    );
  }
}