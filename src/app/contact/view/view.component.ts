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
    
  getContactIndividual(id:any):any{
    this.service.getContactIso(id).subscribe((data)=> {
      this.theUserData = data;
      console.log(data);
    },
    error =>{console.log(error);
    }
    );
  }

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
    this.service.updateContact(id, this.changes).subscribe(
      (data)=>{ this.changes = data;
        this._snackBar.open("User Updated Succesfully", "OK", { duration:3500, panelClass: "success",});
        console.log(data);
      
      });
  }
}
