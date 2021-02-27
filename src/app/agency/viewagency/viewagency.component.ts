import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-viewagency',
  templateUrl: './viewagency.component.html',
  styleUrls: ['./viewagency.component.scss']
})
export class ViewagencyComponent implements OnInit {

  id: number | undefined;
  constructor(private service: AgencyService, private route:ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = +this.getAgencyIndividual(this.route.snapshot.paramMap.get('id'));
  }

  theAgencyData : any = [];
    
  getAgencyIndividual(id:any):any{
    this.service.getAgencyIso(id).subscribe((data)=> {
      this.theAgencyData = data;
      console.log(data);
    },
    error =>{console.log(error);
    }
    );
  }

  edit = false;
  editFields(){
    this.edit = !this.edit;
  }

  changes: any = {
    name:'',
    surname: '',
    taxCode: '',
    address: '',
    // email: '',
    phone: '',
  }
  updateChanges(id:any){
    this.service.updateAgency(id, this.changes).subscribe(
      (data)=>{ this.changes = data;
        this._snackBar.open("User Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      
      });
  }
}
