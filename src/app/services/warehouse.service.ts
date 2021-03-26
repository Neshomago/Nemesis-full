import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const APIUrl ="http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  
  constructor( private http:HttpClient) { }
  
// Tracking Item info post
trackingItem(val:any): Observable<any>{
  return this.http.post(`${APIUrl}/warehouse/itemtracking`,val)
}

//Tracking Info Get
getTrackingData(serial:any):Observable<any>{
  return this.http.get<any[]>(`${APIUrl}/warehouse/tracking/${serial}`);
}

// user tracking ingfo Get
getUserInfoTrackingHistory(id:any):Observable<any>{
  return this.http.get<any[]>(`${APIUrl}/warehouseusertrackinfo/${id}`);
}

  //update item info
  updateWarehouseItem(id:any, changes: any): Observable<any> {
    return this.http.post(`${APIUrl}/warehouseitemup/${id}`, changes);
  }

deleteWarehouseItem(id:any, changes: any): Observable<any> {
    return this.http.post(`${APIUrl}/warehouse/itemdelete/${id}`, changes);
  }
  getWarehouseList(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/warehousenames');
  }

  getItemAgency(customerId:any, locationId:any): Observable<any>{
    return this.http.get<any[]>(`${APIUrl}/warehouseitagency/${customerId}`, locationId);
  }

  // To see all warehouse items from warehouseitemtype
  getItemsListperType(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/warehouseitemspertype');
  }

  // To see all warehouse items from warehouseitem
  getItemsList(): Observable<any>{
    return this.http.get<any[]>(APIUrl + '/warehouseitems');
  }

  // To see warehouse especific Item distribution
  getItemsIndividualList(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/itemlist/${id}`);
  }

  // To see individual item details
  getItemIso(id:any): Observable<any>{
    return this.http.get(`${APIUrl}/itemiso/${id}`);
  }

  //method to save items in warehouse
  addItemWarehouse(val:any): Observable<any>{
    return this.http.post(APIUrl + '/warehouse/additem',val);
  }

  //category List
  getCategories(): Observable<any>{
    return this.http.get(`${APIUrl}/warehousecategory`);
  }

  categoryStock(id:any,val:any):Observable<any>{
    return this.http.post(`${APIUrl}/warehousecategory/stockppdate/${id}`, val);
  }
  
  //category add
  addCategory(val:any):Observable<any>{
    return this.http.post(`${APIUrl}/warehousecategory/add`, val);
  }
  getCountCategories(): Observable<any>{
    return this.http.get(`${APIUrl}/warehousecategorycount`);
  }
}

