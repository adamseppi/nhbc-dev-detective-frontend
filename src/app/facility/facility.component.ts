import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Facility } from './facility';
import { FacilitySale } from './facilitySale';
import { FacilityService } from './facility.service';
import { FacilityInventoryItemService } from '../facilityInventoryItem/facilityInventoryItem.service';
import { FacilityInventoryItemType } from '../facilityInventoryItem/facilityInventoryItem'


@Component({
  selector: 'facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']

})
export class FacilityComponent implements OnInit {

  facilityInventoryItems: FacilityInventoryItemType[] = [];
  inProgressFacilitySales: FacilitySale[] = [];
  lowInventoryItems: FacilityInventoryItemType[] = [];
  facilityId: number;
  colspan = 1;
  constructor(
    private service: FacilityInventoryItemService,
    private route: ActivatedRoute,
    private router: Router,
    private facilityService: FacilityService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.colspan = 2;
    } else {
      this.colspan = 1;
    }
  }


  ngOnInit(): void {

    this.route.paramMap
      .switchMap((params: ParamMap) => this.initialize(+params.get('id')))
      .subscribe(
      item => {
        this.facilityInventoryItems = item
        this.lowInventoryItems = this.facilityInventoryItems.filter(x => x.QuantityOnHand < 5);
        console.log(this.facilityInventoryItems);
      }
      , this.error);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.initializeSales(+params.get('id')))
      .subscribe(
      item => {
        this.inProgressFacilitySales = item
        console.log(this.facilityInventoryItems);
      }
      , this.error);

  }
  error(params): void {

  }

  initialize(id: number): Promise<FacilityInventoryItemType[]> {
    this.facilityId = id;
    return this.service.getFacilityInventoryItems(id);
  }
  initializeSales(id: number): Promise<FacilitySale[]> {
    this.facilityId = id;
    return this.facilityService.getInProgressFacilitySales(id);
  }

  navigateToSale(saleId: number) {
    this.router.navigateByUrl(`facility/${this.facilityId}/sale/${saleId}`)
  }

  startSale(): void {
    this.facilityService.createNewSale(this.facilityId)
      .then(sale => this.router.navigateByUrl(`facility/${this.facilityId}/sale/${sale.Id}`))
      .catch();
  }

  orderInventory(prePopulate: boolean) {

    if (prePopulate) {
      this.router.navigateByUrl(`/facility/${this.facilityId}/createOrder/lowInventoryItems`)
    }
    else{
      this.router.navigateByUrl(`/facility/${this.facilityId}/createOrder/blank`);
    }
  }
  checkInInventory()
  {
    this.router.navigateByUrl(`/facility/${this.facilityId}/checkIn/`);
  }
}