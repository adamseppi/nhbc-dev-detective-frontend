import { Component, OnInit } from '@angular/core';

import { Facility } from './facility/facility';
import { FacilityService } from './facility/facility.service';




@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]

})
export class DashboardComponent implements OnInit {

  facilities: Facility[] = [];

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void {
  
    this.facilityService.getFacilitiesForUser()
      .then(
        items => {       
          var a = "";
          this.facilities = items;      }
      
      ).catch(
        x=>console.log(x)
      );
  }
}