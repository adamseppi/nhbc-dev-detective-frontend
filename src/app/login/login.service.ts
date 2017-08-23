import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {LoginResponse} from './loginresponse.model'
import 'rxjs/add/operator/toPromise';



@Injectable()
export class LoginService {



    constructor(private http: Http) {

    }

    login(username: string, password: string): Promise<boolean> {
       
        var tokenUrl = 'http://windows:62953/api/token';  // URL to web api
        var body = new FormData();
        body.append('username', username);
        body.append('password', password);
       return this.http.post(tokenUrl, body)// todo 
        .toPromise()            
            .then(response => {
                var loginResponse = response.json() as LoginResponse
                if(loginResponse.access_token)
                {
                    localStorage.setItem('access_token', loginResponse.access_token);
                    return true;
                }
               
                return false;
            })
            .catch(x=>false);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    logout(id: number): void {

    }
}