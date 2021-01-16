import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const APIUrl = "http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http:HttpClient) { }
  
  getAgency(id:number):Observable<any>{
    return this.http.get<any[]>(APIUrl+'/agency/'+id);
  }

  getAgencyList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agency');
  }

  addAgency(val:any): Observable<any>{
    return this.http.post(APIUrl + '/agency/add',val);
  }

  updateAgency(val:any): Observable<any>{
    return this.http.put(APIUrl + '/agency/update',val);
  }

  deleteAgency(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/agency/delete',val);
  }


}
