// import { Injectable } from '@angular/core';
// import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadFilesService {

//   private baseUrl = 'http://localhost:8080';

//   constructor(private http: HttpClient) { }

//   upload(file: File): Observable<HttpEvent<any>> {
//     const formData: FormData = new FormData();

//     formData.append('file', file);

//     const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
//       reportProgress: true,
//       responseType: 'json'
//     });

//     return this.http.request(req);
//   }

//   getFiles(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/files`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpEventType , HttpEvent } from '@angular/common/http';
import { map } from  'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  SERVER_URL: string = "https://file.io/";
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  public upload(formData: FormData) {

    return this.http.post<any>(this.baseUrl, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
  
}
