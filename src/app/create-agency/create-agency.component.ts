import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Agency} from 'src/app/agency';
import { SharedService } from '../shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent implements OnInit {

  // agencyForm = this.fb.group(
  //   {
  //     name: null,
  //   }
  // );
  agencyModel = new Agency ('','','','','','','','','','',1);

  constructor(private agencyService:SharedService, private fb:FormBuilder, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  addAgency(){
    this.agencyService.addAgency(this.agencyModel).subscribe(
      (data) => { console.log('Agency Registered', data);
      this._snackBar.open("Agency Registered Succesfully", "OK", { duration:3500, panelClass: "success",}); },
      error => { console.log('Failed to Register Agency', error);
      this._snackBar.open("Failed to Register the Agency", "OK", { duration:3500, panelClass: "error",}); }
      )
      console.warn(this.agencyModel);
    }
    
  saveAgency(){
    this.addAgency();
  }
}