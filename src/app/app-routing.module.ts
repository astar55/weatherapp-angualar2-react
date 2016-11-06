import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

const routes: Routes = [
  { path: 'details/:zip', component: WeatherDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
