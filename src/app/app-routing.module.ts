import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent }   from './dashboard.component';
import { FacilityInventoryItemsComponent }      from './facilityInventoryItem/facilityInventoryItems.component';
import { FacilityInventoryItemDetailComponent }      from './facilityInventoryItem/facilityInventoryItemDetail.component';
import {LoginComponent} from './login/login.component'

import {FacilityComponent} from './facility/facility.component'
import { FacilitySaleComponent } from './facility-sale/facility-sale.component'
import {FacilityOrderComponent} from './facility-order/facility-order.component'
import {InventoryCheckInComponent} from './inventory-check-in/inventory-check-in.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'facilityItemDetail/:id', component: FacilityInventoryItemDetailComponent },
  { path: 'items',     component: FacilityInventoryItemsComponent },
    { path: 'login',     component: LoginComponent }, 
    { path: 'facility/:id',     component: FacilityComponent },
    { path: 'facility/:facilityId/sale/:id',     component: FacilitySaleComponent },
    { path: 'facility/:facilityId/checkIn/',     component: InventoryCheckInComponent },
    { path: 'facility/:facilityId/createOrder/:prePopulate',     component: FacilityOrderComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}