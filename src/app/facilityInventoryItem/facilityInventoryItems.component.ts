import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import {FacilityInventoryItemType} from './facilityInventoryItem'
import { FacilityInventoryItemService } from './facilityInventoryItem.service';  

@Component({
  selector: 'facilityInventoryItem',
  templateUrl: './facilityInventoryItems.component.html',
  styleUrls: ['./facilityInventoryItems.component.css']
})
export class FacilityInventoryItemsComponent implements OnInit {
  ngOnInit(): void {
    if(!localStorage.getItem('access_token'))
      {
          this.router.navigateByUrl('/login');
          return;
      }
    this.getItems();
  }
  title = 'SerpentineHollow (TM)';
  username = 'User Name';
  selectedItem:FacilityInventoryItemType ;
  constructor(private facilityInventoryItemService: FacilityInventoryItemService, private router:Router) { }
  facilityInventoryTypes : FacilityInventoryItemType[]; 
  getItems() : void {
    this.facilityInventoryItemService.getFacilityInventoryItems(2).then(x => this.facilityInventoryTypes = x);   
  }
  onSelect(item: FacilityInventoryItemType): void {
  this.selectedItem = item; 
  }
    gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedItem.Id]);
  }
}




    