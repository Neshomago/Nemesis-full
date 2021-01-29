import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AgencyComponent } from './agency/agency.component';
import { CreateAgencyComponent } from './create-agency/create-agency.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatSortModule } from '@angular/material/sort';
import { FormTicketComponent } from './form-ticket/form-ticket.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CreatContactComponent } from './creat-contact/creat-contact.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { ViewticketComponent } from './tickets/viewticket/viewticket.component';
import { EditComponent } from './tickets/edit/edit.component';
import {MatChipsModule} from '@angular/material/chips';
import { AdditionalequipmentComponent } from './additionalequipment/additionalequipment.component';
import { TestingcompoComponent } from './testingcompo/testingcompo.component';
import { EquipmententryComponent } from './equipmententry/equipmententry.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ViewComponent } from './contact/view/view.component'; 


@NgModule({
  declarations: [
    AppComponent,
    AgencyComponent,
    CreateAgencyComponent,
    ContactComponent,
    CustomersComponent,
    TicketsComponent,
    NavbarComponent,
    FormTicketComponent,
    CreatContactComponent,
    CreateTicketComponent,
    CreateCustomerComponent,
    HomeComponent,
    ViewticketComponent,
    EditComponent,
    AdditionalequipmentComponent,
    TestingcompoComponent,
    EquipmententryComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
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
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatStepperModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }