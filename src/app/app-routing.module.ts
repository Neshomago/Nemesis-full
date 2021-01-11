import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { AgencyComponent } from './agency/agency.component';
import { CustomersComponent } from './customers/customers.component';
import { ContactComponent } from './contact/contact.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ClientsComponent } from './clients/clients.component';
import { FormTicketComponent } from './form-ticket/form-ticket.component';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [
  { path: 'create-agency', component:CreateAgencyComponent},
  { path: 'agency', component:AgencyComponent},
  { path: 'customers', component:CustomersComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'agency', component:AgencyComponent},
  { path:'tickets', component:TicketsComponent},
  { path:'clients',component:ClientsComponent},
  { path:'formticket', component:FormTicketComponent},
  { path:'create-contact', component:CreatContactComponent},
  { path:'create-client', component:CreateClientComponent},
  { path:'create-ticket', component:CreateTicketComponent},
  { path:'create-customer', component:CreateCustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
