import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const APIUrl ="http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private fooSubject = new Subject<any>();

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
    return this.http.post(APIUrl + '/contact/update/'+id, val);
  }

  deleteContact(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/contact/delete',val);
  }

  // getTechnicianList(): Observable<any>{
  //   return this.http.get<any[]>(APIUrl + '/techn');
  // }
  getTechnicianList(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/usersmailsanddata');
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

  getUsersData(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/usersmailsanddata`);
  }

  getUsersCompleteList(): Observable<any>{
    return this.http.get<any>(`${APIUrl}/users`);
  }

  getUserNameEmailList():Observable<any>{
    return this.http.get<any[]>(`${APIUrl}/warehouseusertrackinfolist`);
  }

  technicianUpdateAvailabe(id:any, val:any): Observable<any>{
    console.log("contenido del val: ",val);
    return this.http.post(APIUrl + '/user/updateavailable/'+id, val);
  }

    // metodo para obtener los datos del usuario a acutualizar
  getUsertoUpdate(id:any):Observable<any>{
    return this.http.get<any[]>(`${APIUrl}/users/tomodify/${id}`);
  }

  // metodo para obtener los datos del usuario a acutualizar
  UpdatePasswordAndRole(id:any, val:any):Observable<any>{
    return this.http.post(`${APIUrl}/users/tomodify/${id}`, val);
  }
}
