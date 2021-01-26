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
import { AdditionalequipmentComponent } from './additionalequipment/additionalequipment.component';
import { TestingcompoComponent } from './testingcompo/testingcompo.component';
import { EditComponent } from './tickets/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo:'main', pathMatch:'full' },
  { path:'main', component: HomeComponent},
  { path: 'agency', component:AgencyComponent},
  { path: 'customers', component:CustomersComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'tickets', component:TicketsComponent},
  { path: 'viewticket/:id', component:ViewticketComponent},
  { path: 'create-agency', component:CreateAgencyComponent},
  { path: 'create-contact', component:CreatContactComponent},
  { path: 'create-ticket', component:CreateTicketComponent},
  { path: 'create-customer', component:CreateCustomerComponent},
  { path: 'additional', component:AdditionalequipmentComponent},
  { path:'edit-ticket/:id', component: EditComponent},
  { path:'testing', component:TestingcompoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }