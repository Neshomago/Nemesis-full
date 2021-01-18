import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { AgencyComponent } from './agency/agency.component';
import { CustomersComponent } from './customers/customers.component';
import { ContactComponent } from './contact/contact.component';
import { TicketsComponent } from './tickets/tickets.component';
import {ViewticketComponent} from './tickets/viewticket/viewticket.component';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'agency', component:AgencyComponent},
  { path: 'customers', component:CustomersComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'tickets', component:TicketsComponent},
  { path: 'viewticket', component:ViewticketComponent},
  { path: 'create-agency', component:CreateAgencyComponent},
  { path: 'create-contact', component:CreatContactComponent},
  { path: 'create-ticket', component:CreateTicketComponent},
  { path: 'create-customer', component:CreateCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }