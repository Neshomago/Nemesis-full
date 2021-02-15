import { Component, OnInit } from '@angular/core';
import { UsersService} from 'src/app/services/users.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: UsersService, private fb:FormBuilder) { }

  Contact:any = [];

  currentUser = null;
  currentIndex = -1;


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

  setCurrentUser(user:any, index:any): void{
    this.currentUser = user;
    this.currentIndex = index;
  }

}