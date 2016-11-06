import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DataServiceService } from './data-service.service';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent,
    WeatherSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
