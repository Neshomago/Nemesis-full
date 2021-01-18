import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const APIUrl = "http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  

  getCustomerList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/customers');
  }


  addCustomer(val:any): Observable<any>{
    return this.http.post(APIUrl + '/customer/add',val);
  }

  updateCustomer(val:any): Observable<any>{
    return this.http.put(APIUrl + '/customer/update',val);
  }

  deleteCustomer(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/customer/delete',val);
  }

}
