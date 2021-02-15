import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-viewagency',
  templateUrl: './viewagency.component.html',
  styleUrls: ['./viewagency.component.scss']
})
export class ViewagencyComponent implements OnInit {

  id: number | undefined;
  constructor(private service: AgencyService, private route:ActivatedRoute) { }

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

}
