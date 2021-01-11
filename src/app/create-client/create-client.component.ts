import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  ClientsData = new Clients('','','','','','','');

  constructor(private clientService:SharedService, private _snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  addClient_method(){
    this.clientService.addClients(this.ClientsData).subscribe(
      data => {console.log('Client Registered', data),
                  this._snackBar.open("Agency Registered Succesfully", "OK", { duration:3500, panelClass: "success",});
                this.router.navigateByUrl("/clients");},
      error => { console.log('Failed to Register Client', error),
                  this._snackBar.open("Failed to Register the Agency", "OK", { duration:3500, panelClass: "error",});}
    )
    console.warn(this.ClientsData);
   }

   saveClient(){
    this.addClient_method();

  }
}
