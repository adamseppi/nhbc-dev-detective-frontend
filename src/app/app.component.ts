import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
    styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html'
})


export class AppComponent {
  constructor(private Router:Router)
  {
  
  }
  
  title = localStorage.getItem('tenantNAme');

  logout()
  {
    localStorage.clear();
    this.Router.navigateByUrl('/login')
  }
}
