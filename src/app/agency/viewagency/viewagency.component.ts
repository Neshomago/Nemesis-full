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
  
  edit = false;
  id: number | undefined;

  constructor(private service: AgencyService, private route:ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = +this.getAgencyIndividual(this.route.snapshot.paramMap.get('id'));
  }

  changesAgency: any = {
    name:'',
    vat: '',
    managerId: '',
    certification: '',
    address: '',
    email: '',
    phone: '',
    moreInfo: '',
  }
  theAgencyData : any = [];
    
  getAgencyIndividual(id:any):any{
    this.service.getAgencyIso(id).subscribe((data)=> {
      this.theAgencyData = data[0]
      this.changesAgency.name = data[0].name;
      this.changesAgency.vat = data[0].vat;
      this.changesAgency.managerId = data[0].managerId;
      this.changesAgency.certification = data[0].certification;
      this.changesAgency.address = data[0].address;
      this.changesAgency.email = data[0].email;
      this.changesAgency.phone = data[0].phone;
      this.changesAgency.moreInfo= data[0].moreInfo;
      console.log(data);
    },
    error =>{console.log(error);
    }
    );
  }

  editFields(){
    this.edit = !this.edit;
  }


  updateChanges(id:any){
    this.service.updateAgency(id, this.changesAgency).subscribe(
      (data)=>{ 
        this.theAgencyData.name = this.changesAgency.name;
        this.theAgencyData.vat = this.changesAgency.vat;
        this.theAgencyData.managerId = this.changesAgency.managerId;
        this.theAgencyData.certification = this.changesAgency.certification;
        this.theAgencyData.address = this.changesAgency.address;
        this.theAgencyData.email = this.changesAgency.email;
        this.theAgencyData.phone = this.changesAgency.phone;
        this.theAgencyData.moreInfo = this.changesAgency.moreInfo;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      
      });
  }
}
