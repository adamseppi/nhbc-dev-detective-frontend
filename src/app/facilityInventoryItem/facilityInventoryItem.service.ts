import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FacilityInventoryItemType } from './facilityInventoryItem';
import { FacilityOrderItem } from '../facility-order/facility-order-item';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FacilityInventoryItemService {

    private itemsUrl = 'http://windows:62953/api/FacilityInventoryItemType/facility/';  // URL to web api
   


   

    constructor(private http: Http) {

    }

    getFacilityInventoryItems(facilityId: number): Promise<FacilityInventoryItemType[]> {
        var auth = localStorage.getItem('access_token');
        
        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers( {

                'Authorization': bearerToken
            });
        return this.http.get(this.itemsUrl+facilityId,  { headers:headers})
            .toPromise()
            .then(response => response.json() as FacilityInventoryItemType[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getFacilityInventoryItem(id: number): Promise<FacilityInventoryItemType> {
        var auth = localStorage.getItem('access_token');
        
        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers( {

                'Authorization': bearerToken
            });
        const url = `${this.itemsUrl}/${id}`;
        return this.http.get(url, {headers:headers})
            .toPromise()
            .then(response => response.json().data as FacilityInventoryItemType)
            .catch(this.handleError);
    }

    orderItems(facilityId:number, orderItems:FacilityOrderItem[]): Promise<boolean> 
    {   
        var auth = localStorage.getItem('access_token');
        
        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers( {

                'Authorization': bearerToken
            });
        var url = `http://windows:62953/api/facility/${facilityId}/order/`
        return this.http.post(url, orderItems,{headers:headers})
            .toPromise()
            .then(response => true)
            .catch(error=>{this.handleError(error);
                 return false;});
    }
    checkInItems(facilityId:number, orderItems:FacilityOrderItem[]): Promise<boolean> 
    {   
        var auth = localStorage.getItem('access_token');
        
        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers( {

                'Authorization': bearerToken
            });
        var url = `http://windows:62953/api/facility/${facilityId}/checkin/`
        return this.http.post(url, orderItems,{headers:headers})
            .toPromise()
            .then(response => true)
            .catch(error=>{this.handleError(error);
                 return false;});
    }

    getFacilityTotalRevenue(facilityId:number):Promise<number>
    {
        var auth = localStorage.getItem('access_token');
        
        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers( {

                'Authorization': bearerToken
            });
        var url = `http://windows:62953/api/facilitySale/${facilityId}/totalRevenue/`
       
        return this.http.get(url, {headers:headers})
            .toPromise()
            .then(response => response.json() as number)
            .catch(error=>{this.handleError(error);
                 return -1;});
    }
}