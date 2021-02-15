import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id: number | undefined;
  constructor(private service: UsersService, private route:ActivatedRoute) { }

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

}
