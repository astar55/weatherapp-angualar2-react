import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Headers, Http, RequestOptions } from '@angular/http';
//import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';

import { DataServiceService } from '../data-service.service';
import { datainsertion, dataremove } from '../data-insertion';

@Component({
  selector: 'my-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
  private zipcode: number;
  private prevzipcode: number = 0;
  protected weather: string[];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private DataService: DataServiceService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let zip = +params['zip'];
    })
    let searchForm = document.querySelector(".b-fill");
    searchForm.setAttribute('class', 'searched');
    this.getZipCode();
    setTimeout(this.getWeatherData(), 0);
  }

  ngDoCheck() {
    this.prevzipcode = this.zipcode;
    this.getZipCode();
    if (this.zipcode != this.prevzipcode){
      this.weather = [];
      this.removeWeatherData();
      setTimeout(this.getWeatherData(),0);
    }
    else if(this.weather = []){
      setTimeout(this.getWeatherData(),0);
    }
  }

  ngOnDestroy() {
    this.zipcode = null;
    this.prevzipcode = 0;
    this.weather = [];
    this.removeWeatherData();
  }

  getZipCode(): void {
    this.zipcode = this.DataService.getZipCode()
  }

  getWeatherData(): void {
      $.ajax({
        url: 'zipcodes',
        dataType: 'json'
      })
      .then((data: any) => {
        let reviseddata: any = JSON.stringify(data);
        let jsondata: any = JSON.parse(reviseddata);
        jsondata.htmldata = JSON.parse(jsondata.htmldata);
        this.weather.push(`<md-card>
        <md-card-header>
          <md-card-subtitle align="end">Time: ${ jsondata.htmldata.LocalObservationDateTime.substr(0,16).replace("T", " ") }</md-card-subtitle>
        </md-card-header>
        <md-card-content>
        ${ jsondata.htmldata.Temperature.Imperial.Value + jsondata.htmldata.Temperature.Imperial.Unit }
        <img src="/assets/images/${jsondata.htmldata.WeatherIcon}-s.png">
        ${jsondata.htmldata.WeatherText}
        </md-card-content>
        </md-card>`);
        datainsertion(this.weather, "weather-data");
        })
  }
    
    //let link = `https://www.wunderground.com/cgi-bin/findweather/getForecast?query=${this.zipcode}`;
    // Jquery Ajax
    /*
    $.ajax({
      url: link,
      dataType: "html",
      crossDomain: true, 
      context: document.body,
      contentType: 'text/plain'
    })
    .done((data: string) => {
      let nowdata: string = data.split('<div class="small-12 medium-6 large-4 columns cc1')[1];
      setTimeout((nowdata) => {
        nowdata = nowdata.split('<div class="small-12 medium-6 large-5 columns ccMap"');
        setTimeout((nowdata) => this.weather.push("<div" + nowdata[0]), 0);
      }, 0);
      setTimeout(() => datainsertion(this.weather, "weather-data"), 1000);
    })
    .fail(() => {
      this.weather.push("Cannot Find ZipCode");
      datainsertion(this.weather, "weather-data");
    }
    );
    */
    // Rxjs Ajax
    /*var data = ajax({url: link, crossDomain: true})
            .subscribe(function (data) {
               let weatherdata: string = data.response;
              let nowdata: string = weatherdata.split('<div class="small-12 medium-6 large-4 columns cc1')[1];
              setTimeout((nowdata) => {
                nowdata = nowdata.split('<div class="small-12 medium-6 large-5 columns ccMap"');
                setTimeout((nowdata) => this.weather.push("<div" + nowdata[0]), 0);
              }, 0);
              setTimeout(() => datainsertion(this.weather, "weather-data"), 1000);
              },
             (error) => this.weather.push("Cannot Find ZipCode"));
    */
    // XMLHttpRequest ajax
    /*let data = new XMLHttpRequest();
    data.responseType = "text";
    data.addEventListener("loadstart", () => console.log("load starting...."));
    data.addEventListener("load", () => console.log("loading..."));
    data.addEventListener("loadend", () => {
       console.log("Load end...");
       datainsertion(this.weather, "weather-data");
      });
    data.onload = (e) => {
      let respdoc = data.response;
      setTimeout(this.weather.push(respdoc.querySelector("div.today_nowcard-main panel [[ ui.textClass ]]")), 0);
      setTimeout(this.weather.push(respdoc.querySelector("div.today-daypart-container")), 0);
    }
    data.open("GET", `https://weather.com/weather/today/l/${this.zipcode}:4:US`);
    data.send();
    */


  removeWeatherData(): void {
    dataremove('weather-data');
  }
  

}
