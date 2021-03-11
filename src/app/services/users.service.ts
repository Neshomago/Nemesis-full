import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const APIUrl ="http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private fooSubject = new Subject<any>();
  private usernameSubject = new Subject<any>();
  private RoleASubject = new Subject<any>();
  private RoleCSubject = new Subject<any>();
  private RoleESubject = new Subject<any>();
  private RoleTSubject = new Subject<any>();

  constructor( private http:HttpClient) { }

  getContact():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact/');
  }

  getContactList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/contact');
  }

  addUser(val:any): Observable<any>{
    return this.http.post(APIUrl + '/user/add',val);
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

  getContactUser(username:any): Observable<any>{
    return this.http.get(`${APIUrl}/contactiso/${username}`);
  }

  getUserCheck(usermail:any): Observable<any>{
    return this.http.post(APIUrl + '/user/mail', usermail);
  }

  publishSomeData(data:any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

}
