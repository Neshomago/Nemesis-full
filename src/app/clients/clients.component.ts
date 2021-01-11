import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
import { Prueba } from '../prueba';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  ClientsData = new Clients('','','','','','','');
  ClientsList:any=[];

  PruebaData = new Prueba(1,'');
  PruebaList:any=[];

  constructor(private clientService:SharedService, ) { }
  
  addClient_method(){
    this.clientService.addClients(this.ClientsData).subscribe(
      data => console.log('Client Registered', data),
      error => console.log('Failed to Register Client', error)
    )
  }
  
  saveClient(){
    this.addClient_method();
  }
  
    ngOnInit(): void {
      this.refreshClientsList();
      // this.refreshPruebaList();
    }

    refreshClientsList(){
      this.clientService.getClientsList().subscribe(data => 
        {
         this.ClientsList=data; 
        })
    }
}




  // addPrueba_method(){
  //   this.clientService.addPrueba(this.ClientsData).subscribe(
  //     data => console.log('Dato Prueba Registered', data),
  //     error => console.log('Failed to Register Dato Prueba', error)
  //   )
  //  }

  // savePrueba(){
  //   this.addPrueba_method();
  //   this.refreshClientsList();
  // }

  // refreshPruebaList(){
  //   this.clientService.getPruebaList().subscribe(data => 
  //     {
  //      this.ClientsList=data; 
  //     })
  // }
// }
