import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Opened Tickets', cols: 1, rows: 1 },
          { title: 'Total of Clients', cols: 1, rows: 1 },
          { title: 'Technicians', cols: 1, rows: 1 },
          { title: 'Warehouse', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Opened Tickets', cols: 1, rows: 1 },
          { title: 'Total of Clients', cols: 1, rows: 1 },
          { title: 'Technicians', cols: 1, rows: 1 },
          { title: 'Warehouse', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  no_tickets(){}
  total_clients(){}
  technicians(){}
  warehouse_status(){}
}
