import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FacilityInventoryItemType } from './facilityInventoryItem'
import { FacilityInventoryItemService } from './facilityInventoryItem.service';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'facilityInventoryItem-detail',
  templateUrl: './facilityInventoryItemDetail.component.html',
  styleUrls: ['./facilityInventoryItemDetail.component.css'],
})
export class FacilityInventoryItemDetailComponent implements OnInit {
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.facilityInventoryItemService.getFacilityInventoryItem(+params.get('id')))
      .subscribe(item => this.item = item);
  }
  goBack(): void {
    this.location.back();
  }
  @Input() item: FacilityInventoryItemType;
  constructor(
    private facilityInventoryItemService: FacilityInventoryItemService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
}

