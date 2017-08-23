import { Component, OnInit } from '@angular/core';


import { FormControl } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FacilityInventoryItemService } from '../facilityInventoryItem/facilityInventoryItem.service';

import { FacilityInventoryItemType } from '../facilityInventoryItem/facilityInventoryItem'

import { FacilityOrderItem } from '../facility-order/facility-order-item'


@Component({
  selector: 'app-inventory-check-in',
  templateUrl: './inventory-check-in.component.html',
  styleUrls: ['./inventory-check-in.component.css']
})
export class InventoryCheckInComponent implements OnInit {

  facilityInventoryItems: FacilityInventoryItemType[] = [];
  facilityId: number;
  newProductName: string;
  productNames = [];
  selectedProduct: FormControl;
  newProductQuantity: number;
  products: FacilityInventoryItemType[];
  filteredProducts: any;
  orderItems: FacilityOrderItem[] = [];

  constructor(
    private service: FacilityInventoryItemService,
    private route: ActivatedRoute,
    private router: Router) {
    this.selectedProduct = new FormControl();
    this.filteredProducts = this.selectedProduct.valueChanges
      .startWith(null)
      .map(name => this.filterProducts(name));
  }

  filterProducts(val: string) {
    return val ? this.productNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.productNames;
  }

  ngOnInit() {
    if(!localStorage.getItem('access_token'))
      {
          this.router.navigateByUrl('/login');
          return;
      }

    this.route.paramMap
    .switchMap((params: ParamMap) => this.initialize(+params.get('facilityId'))).subscribe(x=>{}) 
  }

  initialize(id: number): Promise<void> {
    this.facilityId = id;

    return this.service.getFacilityInventoryItems(id)
      .then(
      items => {
        this.products = items;
        this.productNames = this.products.map(x => x.Name);
        console.log(this.facilityInventoryItems);
      }
      , error => console.log(error));
    
  }

  addProduct() {

    var matchingProducts = this.products.filter(x => x.Name == this.newProductName)
    if (!matchingProducts && matchingProducts.length > 0) {
      return;//todo throw an error on the screen 
    }
    var orderItem = new FacilityOrderItem();
    orderItem.ProductId = matchingProducts[0].Id;
    orderItem.ProductName = this.newProductName;
    orderItem.Quantity = this.newProductQuantity;
    this.orderItems.push(orderItem);
  }

  completeOrder() {
    this.service.checkInItems(this.facilityId, this.orderItems)
      .then(a => {
        this.close();
      }
      ).catch(error => console.log(error));

  }
  close() {
    this.router.navigateByUrl(`/facility/${this.facilityId}`);
  }


}
