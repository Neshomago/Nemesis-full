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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog:MatDialog,
              private auth: AuthService, private router: Router,
              public usersService: UsersService) {
  
                this.usersService.getObservable().subscribe( (data) => {
                  console.log('Data received right now: ', data);
                  this.nombre = data.nombre;
                  if(data.RoleA == '1') {
                    this.xRoleA = true;
                    this.zRoleA = 'Admin';
                  } 
                  if(data.RoleC == '1') {
                    this.xRoleC = true;
                    this.zRoleC = 'Customer';
                  }
                  if(data.RoleE == '1') {
                    this.xRoleE = true;
                    this.zRoleE = 'Warehouse';
                  }
                  if(data.RoleT == '1'){
                    this.xRoleT = true;
                    this.zRoleT = 'Technician';
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
