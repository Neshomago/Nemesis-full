import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { debounceTime } from 'rxjs/internal/operators/debounceTime';

const APIUrl = "http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  constructor(private http:HttpClient) { }
  
  //Main ticket Info - Step 1 of the Ticket
  getTicket(id:any):Observable<any>{
    return this.http.get<any[]>(APIUrl+`/tickets/${id}`);
  }

  getTicketList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tickets');
  }

  addTicket(val:any): Observable<any>{
    return this.http.post(APIUrl + '/ticket/add',val);
  }

  
  deleteTicket(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/abort/${id}`, val);
  }
  
  getAgencyName(customerId:string):Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agency/'+customerId);
  }
  
  getTicketIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/ticket/${id}`);
  }
  
  getTickettoUpdate(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/ticket2up/${id}`);
  }
  
  updateTicket(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/update/${id}`, val);
  }

  getTicketAgency(agencyid:any): Observable<any>{
    return this.http.get(`${APIUrl}/agency/${agencyid}`);
  }

  getAgencyList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agenciesperclient');
  }

  // getAgencyListClient():Observable<any>{
  //   return this.http.get<any[]>(APIUrl + '/agenciesperclient');
  // }

  getTagList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tags');
  }

  addequipment(val: any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket-equip/`,val);
  }

  updateEquipment(id:any,val:any):Observable<any>{
    return this.http.post(`${APIUrl}/ticket-equip/update/${id}`,val);
  }

  deleteItemEquipment(id:any):Observable<any>{
    return this.http.delete(`${APIUrl}/ticket-equip/${id}`);
  }

  get_equipment(): Observable<any>{
    return this.http.get(APIUrl+'/ticket-equipment')
  }

  getTicketEquipmentList(ticketId:any): Observable<any>{
    return this.http.get<any>(`${APIUrl}/equipmentList/${ticketId}`);
  }

  updateTicketVersion(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticketv/${id}`,val);
  }

  saveSerialsOfItems(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket-serial/${id}`,val);
  }

  
  getWarehouseNameQuantity(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/ticketwarehouse`);
  }
  
  //Step 4 Assign Technician
  assign_technician(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/technicianassign/${id}`,val);
  }

  update_technician(id:any, val:any): Observable<any>{
    return this.http.post(`${APIUrl}/ticket/technicianupdate/${id}`,val);
  }
  
}


// export class searchAgency{
//   constructor (private httpService: HttpClient) { }  

//     search(term:any) {
//         var listOfAgency = this.httpService.get(APIUrl+'/agency/'+ term)
//         .pipe(
//             debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
//             map(
//                 (data: any) => {
//                     return (
//                         data.length != 0 ? data as any[] : [{"Agency": "No Record Found"} as any]
//                     );
//                 }
//         ));

//         return listOfAgency;  
//     }  
// }