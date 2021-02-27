import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const APIUrl ="http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient) { }

  getContact():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact/');
  }

  getContactList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact');
  }

  addContact(val:any): Observable<any>{
    return this.http.post(APIUrl + '/contact/add',val);
  }

  updateContact(id:any, val:any): Observable<any>{
    return this.http.post(APIUrl + '/contact/update'+id, val);
  }

  deleteContact(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/contact/delete',val);
  }

  getTechnicianList(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/techn');
  }

  getContactIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/contactiso/${id}`);
  }
}
