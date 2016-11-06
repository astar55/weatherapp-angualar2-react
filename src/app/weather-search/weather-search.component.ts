import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'my-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  validinput: boolean = true;

  constructor(
    private http: Http,
    private router: Router,
    private dataService: DataServiceService) { }

  ngOnInit() {
  }

  numLenCheck(num: string): void {
    if (!num.match('^[0-9]{1,5}$') && num.length > 0){
      this.validinput = false;
    }
    else{
      this.validinput = true;
    }
  }

  onSubmit(inputval: string): void {
    if (this.validinput = true && inputval.length == 5){
      let link = ['details', inputval];
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({headers: headers});
      let body = `zipcode=${inputval}&htmldata=`;
      this.dataService.setZipCode(+inputval);
      this.http.post('/zipcode', body , options)
        .toPromise();
      this.router.navigate(link);
    }
    else{
      this.validinput = false;
    }
  }


}
