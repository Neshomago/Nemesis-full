import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { TicketService } from '../../../services/ticket.service';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Uploading photos
// import { UploadFilesService } from 'src/app/services/upload-files.service';
// import { HttpEventType, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';


/* PDF IMPORTING TO SAVE*/
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler } from '@angular/common/http';
import { WarehouseService } from 'src/app/services/warehouse.service';

// To upload files
import { /* ViewChild,*/ ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { UploadService } from  '../../../services/upload-files.service';


@Component({
  selector: 'app-tickettowork',
  templateUrl: './tickettowork.component.html',
  styleUrls: ['./tickettowork.component.scss']
})


export class TickettoworkComponent implements OnInit {
  id: number | undefined;
  theTicketData : any;

  newtags: any = [];
  TechnicianList: any = [];
  unserialTags: any = [];
  warehouseData:any = [];
  tagsarray: any = [];

  equipmentArrayData: any = [];
  ticketVersion ={ version: 1, status: ''};

  //currentTicket = null;
  currentIndex = -1;
  //ticketinView: any;

  AgencyList: any = [];
  FilteredAgency: any = [];

  theResolvedTicketUpdate: any = {
    version: 6,
    status: 'RESOLVED',
    assigned_tags: '',
  };

  agencyToUpdate: any = {
    name:'',
    certification:'',
    address:'',
    phone:'',
    email:'',
    managerId:''
  };

  tickStatus ={ status:'ABORTED'};
  customerId = 'CUSTOME581785f34f4f3';
  categoryList: any = [];
  // @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

  constructor(private service:TicketService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router: Router,
    private whservice:WarehouseService,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    ) { }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    this.getAgencyListName();
    this.getUnserializedItems(ticketId);
    this.id = +this.getTicketIndividual(this.route.snapshot.paramMap.get('id'));
    this.Technicians_List();
    this.getTags();
    this.allestimentoTicketList(ticketId);
    this.getCategoryList();
  }

  getAgencyListName(){
    this.service.getAgencyName(this.customerId).subscribe(agency => {
      this.AgencyList = agency;
    })
  }

  getTicketIndividual(id:any):any{
    this.service.getTicketIso(id).subscribe((data)=> {
      this.theTicketData = data[0];
      this.theResolvedTicketUpdate.assigned_tags = data[0].assigned_tags;
      this.theResolvedTicketUpdate.tech_assign = data[0].tech_assign;
      this.theResolvedTicketUpdate.file1 = data[0].file1;
      this.theResolvedTicketUpdate.file2 = data[0].file2;
      this.theResolvedTicketUpdate.file3 = data[0].file3;
      this.theResolvedTicketUpdate.file4 = data[0].file4;
      this.theResolvedTicketUpdate.file5 = data[0].file5;
      this.theResolvedTicketUpdate.file6 = data[0].file6;
      this.theResolvedTicketUpdate.file7 = data[0].file7;
      this.theResolvedTicketUpdate.file8 = data[0].file8;
      this.theResolvedTicketUpdate.file9 = data[0].file9;
      this.theResolvedTicketUpdate.file10 = data[0].file10;
      this.theResolvedTicketUpdate.file11 = data[0].file11;
      this.theResolvedTicketUpdate.file12 = data[0].file12;
      // let agenciaSelected:any = this.AgencyList.find((a:any) => a.id === parseInt(this.theTicketUpdate.agencyId, 10));
      // this.agencyToUpdate.name = agenciaSelected.name;
    },
    error =>{console.log(error);
    });
  }
  
  getTags(){
    this.service.getTagList().subscribe(data => {
      this.newtags = data;
    });
  }

  getCategoryList(){
    this.whservice.getCategories().subscribe(
      (data) => { this.categoryList = data;
    });
  }

  Technicians_List(){
    this.usersService.getTechnicianList().subscribe(
      data => this.TechnicianList = data
      );
  }

  getUnserializedItems(id:any){
    this.service.getTicketEquipmentList(id).subscribe(
      (tag) => { this.unserialTags = tag;
      }
      );
  }

  allestimentoTicketList(ticketId: any){
    this.service.getTicketEquipmentList(ticketId).subscribe(
      data => {this.equipmentArrayData = data;
      });
  }

  deleteTicket(id:number){
    if (confirm('Are you sure you want to abort the ticket?')){
        this.service.deleteTicket(id, this.tickStatus).subscribe(
          (data) => { this.tickStatus = data;
            this._snackBar.open("Ticket Aborted Succesfully", "OK", { duration:3500, panelClass: "success",});
            this.router.navigateByUrl("/tickets");
          });
      }
}

// setDefaultDate(){
//   let year, month, day, hour, minute, second;

//   year = this.techDate.getFullYear();
//   month = this.techDate.getMonth()+1;
//   day = this.techDate.getDate();
//   hour = this.techDate.getHours();
//   minute = this.techDate.getMinutes();
//   second = this.techDate.getSeconds();

//   this.TechnicianModel.assignedDate = year+'-'+month+'-'+day+' '+'0'+hour+':'+'0'+minute+':'+'0'+second;
//   console.warn('prueba date format: ',this.TechnicianModel.assignedDate);
// }


// assigned_tags = '';
// resolvedticket: any = {
//   version: 6,
//   status: 'RESOLVED',
//   assigned_tags: '',
// };
resolved(id: any){
  if(this.theResolvedTicketUpdate.assigned_tags != ''){
    this.service.updateTicketResolved(id, this.theResolvedTicketUpdate).subscribe(
      (data) => { 
        this.theTicketData.tech_assign = this.theResolvedTicketUpdate.tech_assign;
        this.theTicketData.assigned_tags = this.theResolvedTicketUpdate.assigned_tags;
        this._snackBar.open(data, "OK", { duration:3500, panelClass: "success",});
    });
  }
  this.resolvedImagesroute(id);
  setTimeout(
    function(){
      window.location.reload()}
      , 500);
}


rutaFile:any = {
  file1: '',
  file2: '',
  file3: '',
  file4: '',
  file5: '',
  file6: '',
  file7: '',
  file8: '',
  file9: '',
  file10:'',
  file11:'',
  file12:'',
};

// Method to upload images
files:any;
uploadMultiple(event: any) {
  const files: FileList = event.target.files;
  this.files = files;
  // console.log('Files: ',files);
  const formdata = new FormData();

  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    console.log('Archivo: ', element);
    console.log('Valor a ruta: '+(this.rutaFile['file'+(index+1)] = element.name));
    formdata.append('files', element);
  }
  console.log('Nombre de Archivo: ', this.rutaFile);

  this.httpClient
    .post('http://localhost:5000/uploader', formdata)
    .subscribe(
      (d) => {
        console.log('post image: ', d);
      },
      (error) => {
        console.error(error);
      }
    );
}

eliminafoto(file:any){
  this.httpClient
  .post('http://localhost:5000/downfoto', file.name)
  .subscribe(
    (d) => {
      console.log(d);
      if(d == '1'){
        const borraeste = this.files.map((e: { name: any; }) => e.name).indexOf(file.name);
        this.files.splice(borraeste, 1);
      } else {
        console.log('Error no se pudo eliminar el archivo');
      }
    },
    (error) => {
      console.error(error);
    }
  );
}

resolvedImagesroute(id:any){
    this.service.resolvedImages(id, this.rutaFile).subscribe(
      (data) => { console.log('Datos subidos.',data);
      console.table(this.rutaFile);
    });
  }

//uploadFile(file: any) {  
  // const formData = new FormData();  
  // formData.append('file', file.data);  
  // file.inProgress = true;  
  // this.uploadService.upload(formData).pipe(  
  //   map(event => {  
  //     switch (event.type) {  
  //       case HttpEventType.UploadProgress:  
  //         file.progress = Math.round(event.loaded * 100 / event.total);  
  //         break;  
  //       case HttpEventType.Response:  
  //         return event;  
  //     }  
  //   }),  
  //   catchError((error: HttpErrorResponse) => {  
  //     file.inProgress = false;  
  //     return of(`${file.data.name} upload failed.`);  
  //   })).subscribe((event: any) => {  
  //     if (typeof (event) === 'object') {  
  //       console.log(event.body);  
  //     }  
  //   });  
    
//}

// private uploadFiles() {  
//   this.fileUpload.nativeElement.value = '';  
//   this.files.forEach(file => {  
//     this.uploadFile(file);  
//   });  
// }

// onClick() {  
//   const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
//   for (let index = 0; index < fileUpload.files.length; index++)  
//   {  
//    const file = fileUpload.files[index];  
//    this.files.push({ data: file, inProgress: false, progress: 0});  
//   }  
//     this.uploadFiles();  
//   };  
//   fileUpload.click();  
// }


@ViewChild('dataPdf')
filename= "_tid_";
rptDownload(): void{
  const DATA = document.getElementById('dataPdfReport') as HTMLDivElement;
    
  html2canvas(DATA).then(canvas => {
      
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 5;
      PDF.internal.scaleFactor = 30;
      PDF.addImage(FILEURI, 'PNG',5,position,fileWidth-(fileWidth * 0.05), fileHeight-(fileHeight * 0.05));
      
      PDF.save('RPT_'+this.theTicketData.code+ this.filename +this.theTicketData.id+'.pdf');
  });     
}

}
