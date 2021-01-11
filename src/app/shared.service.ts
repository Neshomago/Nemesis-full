import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000";

  constructor( private http:HttpClient) { }


  /* Gets */
  getTicket():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/tickets/');
  }

  getTicketList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/tickets');
  }

  getAgency():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/agency/');
  }

  getAgencyList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/agency/');
  }

  getClient():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/customer/');
  }

  getClientList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/customer/');
  }

  getContact():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/contact/');
  }

  getContactList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/contact/');
  }
  
  getCustomerList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/customer/');
  }
  /* Posts */
  addTicket(val:any):Observable<any>{
    return this.http.post(this.APIUrl + '/tickets',val);
  }

  addCustomer(val:any):  Observable<any>{
    return this.http.post(this.APIUrl + '/customer/',val);
  }

  //testing line procedure
  addClients(val:any):  Observable<any>{
    return this.http.post(this.APIUrl + '/clients/',val);
  }

  getClientsList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/clients/');
  }



  getPrueba(val:any): Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/prueba/');
  }

  addPrueba(val:any):  Observable<any>{
    return this.http.post(this.APIUrl + '/prueba/',val);
  }

  getPruebaList():Observable<any>{
    return this.http.get<any[]>(this.APIUrl + '/prueba/');
  }
  
  /* testing */
  addAgencyTest(val:any): Observable<any>{
    return this.http.post(this.APIUrl + '/Agencies/',val);
  }
  
// LINEA DE PRUEBA FIN


  addContacts(val:any): Observable<any>{
    return this.http.post(this.APIUrl + '/contact/',val);
  }
  addAgency(val:any): Observable<any>{
    return this.http.post(this.APIUrl + '/agency/',val);
  }

  addClientTest(val:any): Observable<any>{
    return this.http.post(this.APIUrl + '/clientstest/',val);
  }

  updateTicket(val:any){
    return this.http.put(this.APIUrl + '/tickets/',val);
  }

  deleteTicket(val:any){
    return this.http.delete(this.APIUrl + '/tickets/',val);
  }


  

}