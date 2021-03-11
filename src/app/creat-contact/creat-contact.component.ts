import { Component, OnInit } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Contact } from '../contact';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-creat-contact',
  templateUrl: './creat-contact.component.html',
  styleUrls: ['./creat-contact.component.scss']
})
export class CreatContactComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar, private contactService: UsersService, private router: Router) { }

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
    this.router.navigateByUrl('/contact');
  }

}


// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar} from '@angular/material/snack-bar';
// import { Contact } from '../contact';
// import { UsersService } from '../services/users.service';


// @Component({
//   selector: 'app-creat-contact',
//   templateUrl: './creat-contact.component.html',
//   styleUrls: ['./creat-contact.component.scss']
// })
// export class CreatContactComponent implements OnInit {


//   RoleA:number = 1;
//   RoleE:number = 1;
//   RoleC:number = 1;
//   RoleT:number = 1;

//   userRole: Array<String> = ['ADMIN', 'TECH', 'CUSTOMER', 'WAREHOUSE'];

//   constructor(private _snackBar:MatSnackBar, private contactService: UsersService) { }

//   contactModel = new Contact('','','','','','','','',1);

//   ngOnInit(): void {
//   }

//   addContact(){
//     this.contactService.addContact(this.contactModel).subscribe(
//       (data) => { console.log('Contact Registered', data);
//       this._snackBar.open("Contact Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); },
//       error => { console.log('Failed to Register Contact', error);
//       this._snackBar.open("Failed to Register the Contact", "OK", { duration:3500, panelClass: "error",}); }
//       )
//       console.warn(this.contactModel);
//     }
    
//   saveContact(){
//     this.addContact();
//   }

// }
