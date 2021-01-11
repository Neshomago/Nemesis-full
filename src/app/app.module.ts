import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgencyComponent } from './agency/agency.component';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { ContactComponent } from './contact/contact.component';
import { CustomersComponent } from './customers/customers.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ClientsComponent } from './clients/clients.component';
import { FormTicketComponent } from './form-ticket/form-ticket.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    AgencyComponent,
    CreateAgencyComponent,
    ContactComponent,
    CustomersComponent,
    TicketsComponent,
    NavbarComponent,
    ClientsComponent,
    FormTicketComponent,
    CreatContactComponent,
    CreateClientComponent,
    CreateTicketComponent,
    CreateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,

  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
