import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Facility } from './facility';
import { FacilitySale } from './facilitySale';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FacilityService implements OnInit{
 
    ngOnInit(): void {
        
    }

    private itemsUrl = 'http://windows:62953/api/facility/user/';  // URL to web api
    private facilitySaleUrlbase = 'http://windows:62953/api/facility/';
    private facilitySaleUrlEnd = '/sale/new/';  // URL to web api




    constructor(private http: Http)  {

    }

    getFacilitiesForUser(): Promise<Facility[]> {
        var auth = localStorage.getItem('access_token');

        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers({

            'Authorization': bearerToken
        });
        return this.http.get(this.itemsUrl, { headers: headers })
            .toPromise()
            .then(response => response.json() as Facility[])
            .catch(this.handleError);
    }

    getInProgressFacilitySales(facilityId: number): Promise<FacilitySale[]> {

        var auth = localStorage.getItem('access_token');
        var bearerToken = `Bearer ${auth}`;
        var headers = new Headers({
            'Authorization': bearerToken
        });

        var salesformatBase = `http://windows:62953/api/facilitySale/facility/${facilityId}?inProgressOnly=true`;  // URL to web api

        return this.http.get(salesformatBase, { headers: headers })
            .toPromise()
            .then(response => response.json() as FacilitySale[])
            .catch(this.handleError);
    }

    createNewSale(id: number): Promise<FacilitySale> {
        var auth = localStorage.getItem('access_token');

        var bearerToken = `Bearer ${auth}`;

        var headers = new Headers({

            'Authorization': bearerToken
        });
        return this.http.get(this.facilitySaleUrlbase + id + this.facilitySaleUrlEnd, { headers: headers })
            .toPromise()
            .then(response => response.json() as FacilitySale)
            .catch(this.handleError);


    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}