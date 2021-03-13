import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id: number | undefined;
  edit = false;
  constructor(private service: UsersService, private route:ActivatedRoute,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = +this.getContactIndividual(this.route.snapshot.paramMap.get('id')); 
  }
  
  theUserData : any = [];
  
    changes: any = {
      name:'',
      surname:'',
      taxCode: '',
      address: '',
      email: '',
      phone: '',
    }
    
  getContactIndividual(id:any):any{
    this.service.getContactIso(id).subscribe((data)=> {
      this.theUserData = data[0];
      this.changes.name = data[0].name;
      this.changes.surname = data[0].surname;
      this.changes.taxCode = data[0].taxCode;
      this.changes.address = data[0].address;
      this.changes.email = data[0].email;
      this.changes.phone = data[0].phone;
      console.log('data user: ', this.theUserData);
    },
    error =>{console.log(error);
    }
    );
  }

  editFields(){
    this.edit = !this.edit;
    console.log('datos a editar para actgualizar: ',this.changes)
  }

  updateChanges(id:any){
    this.service.updateContact(id, this.changes).subscribe(
      (data)=>{
        this.theUserData.name = this.changes.name;
        this.theUserData.surname = this.changes.surname;
        this.theUserData.taxCode = this.changes.taxCode;
        this.theUserData.address = this.changes.address;
        this.theUserData.email = this.changes.email;
        this.theUserData.phone = this.changes.phone;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
      });
  }
}
