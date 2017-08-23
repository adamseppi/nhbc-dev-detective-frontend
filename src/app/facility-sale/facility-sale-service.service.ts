import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Facility } from '../facility/facility';
import { FacilitySale } from '../facility/facilitySale';
import { FacilitySaleItem } from '../facility/facilitySaleItem';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FacilitySaleService {

  getSaleUrl = `http://windows:62953/api/facilitySale/`;
  constructor(private http: Http) {

  }


  getSale(id: string): Promise<FacilitySale> {

    var auth = localStorage.getItem('access_token');
    var bearerToken = `Bearer ${auth}`;
    var headers = new Headers({
      'Authorization': bearerToken
    });

    return this.http.get(this.getSaleUrl + id, { headers: headers })
      .toPromise()
      .then(response => {
        var a = response.json();
        var b = a as FacilitySale;
        return b;
      })
      .catch(this.handleError);
  }


  createSaleItem(facilitySaleId: string, facilitySale: FacilitySaleItem): Promise<FacilitySaleItem> {

    var auth = localStorage.getItem('access_token');
    var bearerToken = `Bearer ${auth}`;
    var headers = new Headers({
      'Authorization': bearerToken
    });

    var facilitySaleItemUrl = `http://windows:62953/api/facilitySale/${facilitySaleId}/sale`;


    return this.http.post(facilitySaleItemUrl, facilitySale, { headers: headers })
      .toPromise()
      .then(response => {
        return response.json() as FacilitySaleItem;
      })
      .catch(this.handleError);
  }

  completeSale(facilitySaleId: string) :Promise<boolean> {

    var auth = localStorage.getItem('access_token');
    var bearerToken = `Bearer ${auth}`;
    var headers = new Headers({
      'Authorization': bearerToken
    });

    var facilitySaleItemUrl = `http://windows:62953/api/facilitySale/${facilitySaleId}/complete`;

    return this.http.post(facilitySaleItemUrl, facilitySaleId, { headers: headers })
      .toPromise()
      .then(response => { return true;
      }).catch(error=> {
        console.error('An error occurred', error); // for demo purposes only
        return false
      })
  }

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
