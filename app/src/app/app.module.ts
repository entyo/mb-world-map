import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({ apiKey: 'API_KEY_HERE' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
