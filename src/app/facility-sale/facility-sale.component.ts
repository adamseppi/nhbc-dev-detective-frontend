import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FacilitySaleService } from './facility-sale-service.service'
import { FacilitySale } from '../facility/facilitySale'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FacilityInventoryItemType } from '../facilityInventoryItem/facilityInventoryItem'

import { FacilityInventoryItemService } from '../facilityInventoryItem/facilityInventoryItem.service'
import { FacilitySaleItem } from '../facility/facilitySaleItem'
import { Router } from '@angular/router';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-facility-sale',
  templateUrl: './facility-sale.component.html',
  styleUrls: ['./facility-sale.component.css']
})
export class FacilitySaleComponent implements OnInit {

  productNames = [

  ];

  newProductQuantity: number;
  newProductName: string;
  newProductNotes: string;


  sale: FacilitySale;
  selectedProduct: FormControl;
  products: FacilityInventoryItemType[];
  filteredStates: any;
  facilityId: number;

  constructor(private facilitySaleService: FacilitySaleService,
    private route: ActivatedRoute,
    private router: Router,
    private facilityInventoryItemService: FacilityInventoryItemService) {
    this.sale = new FacilitySale();
    this.sale.CustomerName = "..."
    this.sale.FacilitySaleItems = [];
    this.selectedProduct = new FormControl();

    this.filteredStates = this.selectedProduct.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  filterStates(val: string) {
    return val ? this.productNames.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.productNames;
  }

  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.route.params.subscribe(params =>
      this.facilityId = +params['facilityId']);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.facilitySaleService.getSale(params.get('id')))
      .subscribe(
      a => {
        this.sale = a
        if (!this.sale.FacilitySaleItems) {
          this.sale.FacilitySaleItems = [];
        }
        console.log(this.sale);
      }
      , error => console.log(error));

    this.route.paramMap
      .switchMap((params: ParamMap) => this.facilityInventoryItemService.getFacilityInventoryItems(+params.get('facilityId')))
      .subscribe(
      items => {

        this.products = items;
        this.productNames = this.products.map(x => x.Name);
        console.log(this.sale);
      }
      , error => console.log(error));
  }
  addProduct() {
    var saleItem = new FacilitySaleItem();

    var matchingProducts = this.products.filter(x => x.Name == this.newProductName);

    if (!matchingProducts || matchingProducts.length < 1) {
      //todo show error message 
      return;
    }

    saleItem.FacilityInventoryItemTypeId = matchingProducts[0].Id;



    saleItem.Notes = this.newProductNotes
    saleItem.Quantity = this.newProductQuantity

    this.facilitySaleService.createSaleItem(this.sale.Id, saleItem).then(si => {
      this.sale.FacilitySaleItems.push(si);
      this.newProductName = '';
      this.newProductQuantity = 0;
      this.newProductNotes = '';
    }).catch(
      error => console.log(error));
  }

  completeSale() {
    this.facilitySaleService.completeSale(this.sale.Id)
      .then(result => {
        if (result) {
          close();
        }
      })

  }

  close() {
    this.router.navigateByUrl(`/facility/${this.facilityId}`)
  }
}
