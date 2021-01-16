import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Contact } from '../contact';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-creat-contact',
  templateUrl: './creat-contact.component.html',
  styleUrls: ['./creat-contact.component.scss']
})
export class CreatContactComponent implements OnInit {


  userRole: Array<String> = ['ADMIN', 'TECH', 'CUSTOMER', 'WAREHOUSE'];

  constructor(private _snackBar:MatSnackBar, private contactService: UsersService) { }

  contactModel = new Contact('','','','','','','','',1);

  ngOnInit(): void {
  }

  addContact(){
    this.contactService.addContact(this.contactModel).subscribe(
      (data) => { console.log('Contact Registered', data);
      this._snackBar.open("Contact Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); },
      error => { console.log('Failed to Register Contact', error);
      this._snackBar.open("Failed to Register the Contact", "OK", { duration:3500, panelClass: "error",}); }
      )
      console.warn(this.contactModel);
    }
    
  saveContact(){
    this.addContact();
  }

}
