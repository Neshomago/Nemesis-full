import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog:MatDialog) {}

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
