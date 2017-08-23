import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';


import { AppComponent }        from './app.component';
import { DashboardComponent }        from './dashboard.component';

import { FacilityInventoryItemService } from './facilityInventoryItem/facilityInventoryItem.service';
import { FacilityInventoryItemDetailComponent } from './facilityInventoryItem/facilityInventoryItemDetail.component';
import { FacilityInventoryItemsComponent} from './facilityInventoryItem/facilityInventoryItems.component';

import { AppRoutingModule }     from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule, MdAutocompleteModule} from '@angular/material';
import { LoginService} from './login/login.service'
import { LoginComponent} from './login/login.component'
import { FacilityComponent} from './facility/facility.component'

import { FacilityService} from './facility/facility.service';

import { FacilitySaleService } from './facility-sale/facility-sale-service.service';
import { FacilitySaleComponent } from './facility-sale/facility-sale.component';
import { OnlyNumberDirective } from './onlynumber.directive';
import { FacilityOrderComponent } from './facility-order/facility-order.component';
import { InventoryCheckInComponent } from './inventory-check-in/inventory-check-in.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NoopAnimationsModule
    
  ],
  exports:[  
  MaterialModule,
  MdAutocompleteModule,FormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    FacilityInventoryItemDetailComponent,
    FacilityInventoryItemsComponent,
    LoginComponent,
    FacilityComponent,
    FacilitySaleComponent,
    OnlyNumberDirective,
    FacilityOrderComponent,
    InventoryCheckInComponent,
    
 
  ],
  providers: [ FacilityInventoryItemService,LoginService,FacilityService,FacilitySaleService],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}