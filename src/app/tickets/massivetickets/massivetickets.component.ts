import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-massivetickets',
  templateUrl: './massivetickets.component.html',
  styleUrls: ['./massivetickets.component.scss']
})
export class MassiveticketsComponent implements OnInit {

  fileToUpload: File | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  // this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //   // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
}

}
