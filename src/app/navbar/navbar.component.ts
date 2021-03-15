import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  xRoleA: boolean = false;
  xRoleC: boolean = false; 
  xRoleE: boolean = false;
  xRoleT: boolean = false;
  nombre: any;
  zRoleA: any;
  zRoleC: any;
  zRoleE: any;
  zRoleT: any;
  iniciales:any;
  surname: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog:MatDialog,
              private auth: AuthService, private router: Router,
              public usersService: UsersService) {
  
                if(localStorage.getItem('zRoleA')) {
                  this.zRoleA = localStorage.getItem('zRoleA'); 
                }

                if(localStorage.getItem('zRoleC')) {
                  this.zRoleC = localStorage.getItem('zRoleC'); 
                }

                if(localStorage.getItem('zRoleE')) {
                  this.zRoleE = localStorage.getItem('zRoleE'); 
                }

                if(localStorage.getItem('zRoleT')) {
                  this.zRoleT = localStorage.getItem('zRoleT'); 
                }

                if(localStorage.getItem('nombre')) {
                  this.nombre = localStorage.getItem('nombre'); 
                }

                if(localStorage.getItem('surname')) {
                  this.surname = localStorage.getItem('surname'); 
                }

                this.usersService.getObservable().subscribe( (data) => {
                  console.log('Data received right now: ', data);
                  this.nombre = data.nombre;
                  this.surname = data.surname;
                  localStorage.setItem('nombre', this.nombre);
                  if(data.RoleA == '1') {
                    this.xRoleA = true;
                    this.zRoleA = 'Admin';
                    localStorage.setItem('zRoleA', this.zRoleA);
                  } 
                  if(data.RoleC == '1') {
                    this.xRoleC = true;
                    this.zRoleC = 'Customer';
                    localStorage.setItem('zRoleC', this.zRoleC);
                  }
                  if(data.RoleE == '1') {
                    this.xRoleE = true;
                    this.zRoleE = 'Warehouse';
                    localStorage.setItem('zRoleE', this.zRoleE);
                  }
                  if(data.RoleT == '1'){
                    this.xRoleT = true;
                    this.zRoleT = 'Technician';
                    localStorage.setItem('zRoleT', this.zRoleT);
                  }
                });
              }

  salir() {
    this.xRoleA = false;
    this.xRoleC = false;
    this.xRoleE = false;
    this.xRoleT = false;
    this.nombre = '';
    this.zRoleA = '';
    this.zRoleC = '';
    this.zRoleE = '';
    this.zRoleT = '';
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  
  openDialogSettingsBox(){
    this.dialog.open(Settings,{width: '280px'});
  }

}

@Component({
  selector: 'settings-nemesis',
  template:`
  <h1>Settings Box</h1>
  <table>
    <tr>
      <td colspan="1">Dark Mode</td>
      <td>&nbsp;</td>
      <td colspan="1">Language</td>
    </tr>
    <tr>
      <td><button>Activate</button></td>
      <td>&nbsp;</td>
      <td>
        <select>
          <option>option lenguage</option>
        </select>
    </td>
    </tr>
  </table>
  `,
})
export class Settings {

}


// import { Component } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';
// import { map, shareReplay } from 'rxjs/operators';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {

//   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
//     .pipe(
//       map(result => result.matches),
//       shareReplay()
//     );

//   constructor(private breakpointObserver: BreakpointObserver, public dialog:MatDialog) {}

//   openDialogSettingsBox(){
//     this.dialog.open(Settings,{width: '280px'});
//   }
// }

// @Component({
//   selector: 'settings-nemesis',
//   template:`
//   <h1>Settings Box</h1>
//   <table>
//     <tr>
//       <td colspan="1">Dark Mode</td>
//       <td>&nbsp;</td>
//       <td colspan="1">Language</td>
//     </tr>
//     <tr>
//       <td><button>Activate</button></td>
//       <td>&nbsp;</td>
//       <td>
//         <select>
//           <option>option lenguage</option>
//         </select>
//     </td>
//     </tr>
//   </table>
//   `,
// })
// export class Settings {

// }
