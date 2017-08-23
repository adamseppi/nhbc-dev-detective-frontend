import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FacilityInventoryItemService } from '../facilityInventoryItem/facilityInventoryItem.service';

import { FacilityInventoryItemType } from '../facilityInventoryItem/facilityInventoryItem'

import { FacilityOrderItem } from './facility-order-item'


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-facility-order',
  templateUrl: './facility-order.component.html',
  styleUrls: ['./facility-order.component.css']
})
export class FacilityOrderComponent implements OnInit {
  facilityInventoryItems: FacilityInventoryItemType[] = [];
  lowInventoryItems: FacilityInventoryItemType[] = [];
  facilityId: number;
  newProductName:string;
  productNames = [];
  selectedProduct: FormControl;
  newProductQuantity:number;
  products: FacilityInventoryItemType[];
  filteredProducts: any;
  orderItems:FacilityOrderItem[] = [];
  totalRevenue:number;
  
  constructor(
    private service: FacilityInventoryItemService,
    private route: ActivatedRoute,
    private router: Router) 
    {
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
    .switchMap((params: ParamMap) => this.initialize(+params.get('facilityId'),params.get('prePopulate'))).subscribe(x=>{}) 


  }

  initialize(id: number, prepopulateLowInventory:string): Promise<void> {
    this.facilityId = id;
    
   return this.service.getFacilityInventoryItems(id)
    .then(
    items => {
     this.products = items;
     this.productNames = this.products.map(x=>x.Name);
     this.lowInventoryItems = this.products.filter(x => x.QuantityOnHand < 5);
     console.log(this.facilityInventoryItems);
     if(prepopulateLowInventory == 'lowInventoryItems')
     {
        this.orderItems = this.lowInventoryItems.map(x=>{
          var orderItem = new FacilityOrderItem();
          orderItem.ProductId = x.Id;
          orderItem.ProductName = x.Name;
          orderItem.Quantity = 10;
          return orderItem})
     }
    }
    , error => console.log(error)).then(x=> {
      this.service.getFacilityTotalRevenue(id).then(x=>this.totalRevenue = x)
    });
  }

  addProduct(){
    
    var matchingProducts = this.products.filter(x=>x.Name == this.newProductName)
    if(!matchingProducts && matchingProducts.length > 0)
    {
      return;//todo throw an error on the screen 
    }
    var orderItem = new FacilityOrderItem();
    orderItem.ProductId =  matchingProducts[0].Id;
    orderItem.ProductName = this.newProductName;
    orderItem.Quantity = this.newProductQuantity;
    this.orderItems.push(orderItem);
   }

  completeOrder(){
    this.service.orderItems(this.facilityId,this.orderItems)
    .then(a=>{
      this.close();
    }
    ).catch(error=>console.log(error));
    
  }
  close(){
    this.router.navigateByUrl(`/facility/${this.facilityId}`);
  }
}
