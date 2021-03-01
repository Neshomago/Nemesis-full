import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  test : string ='NEMESIS';
  error : any;
 Login:any = false;
  visibility: boolean = true;

  constructor(
    // private auth:AuthService,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

 

  matcher = new MyErrorStateMatcher();

  onLogin() {
    this.visibility = !this.visibility;
    return this.router.navigate(['']);
  }

}