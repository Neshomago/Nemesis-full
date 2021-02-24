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
import { EquipmententryComponent } from './equipmententry/equipmententry.component';
import { ViewcustomerComponent } from './customers/view/viewcustomer.component';
import { EditcustomerComponent } from './customers/edit/editcustomer.component';
import { ViewagencyComponent } from './agency/viewagency/viewagency.component';
import { ViewComponent } from './contact/view/view.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RegisteritemComponent } from './warehouse/registeritem/registeritem.component';
import { EdititemComponent } from './warehouse/edititem/edititem.component';
import { ViewwarehouseComponent } from './warehouse/viewwarehouse/viewwarehouse.component';
import { DdtpdfComponent } from './tickets/ddtpdf/ddtpdf.component';
import { ViewitemsetComponent } from './warehouse/viewitemset/viewitemset.component';
import { ViewtickettechComponent } from './tickets/viewtickettech/viewtickettech.component';

const routes: Routes = [
  { path: '', redirectTo:'main', pathMatch:'full' },
  { path: 'main', component: HomeComponent},
  { path: 'agency', children:[
    {path: '', component:AgencyComponent},
    {path: 'viewagency/:id',component:ViewagencyComponent},
  ]},
  { path: 'customers', children:[
    { path: '', component:CustomersComponent},
    { path: 'viewcustomer/:id', component:ViewcustomerComponent},
  ]},
  { path: 'contact',children:[
    {path: '',component:ContactComponent},
    {path: 'viewcontact/:id', component:ViewComponent},

  ]},
  { path: 'tickets', children: [
    { path: '', component:TicketsComponent},
    { path: 'viewticket/:id', component:ViewticketComponent},
    { path: 'ddtpdf',component:DdtpdfComponent}
  ]},
  { path: 'warehouse', children: [
    { path: '',component:WarehouseComponent},
    { path: 'edit-item/:id', component:EdititemComponent},
    { path: 'viewitem/:id', component:ViewwarehouseComponent},
    { path: 'viewitemset/:id', component:ViewitemsetComponent}
  ]},
  { path: 'create-item', component:RegisteritemComponent},
  { path: 'create-ticket', component:CreateTicketComponent},
  { path: 'create-agency', component:CreateAgencyComponent},
  { path: 'create-contact', component:CreatContactComponent},
  { path: 'create-customer', component:CreateCustomerComponent},
  { path: 'edit-customer/:id', component: EditcustomerComponent},
  { path: 'additional', component:AdditionalequipmentComponent},
  { path: 'edit-ticket/:id', component: EditComponent},
  { path: 'testing', component:TestingcompoComponent},
  { path: 'equipmententry', component:EquipmententryComponent},
  { path:'viewtickettech', component: ViewtickettechComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }