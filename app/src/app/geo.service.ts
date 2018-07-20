import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(private http: HttpClient, private mapsAPILoader: MapsAPILoader) {}

  getGeoByCountryName(country: string) {
    return this.mapsAPILoader.load().then(() => {
      const geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: country }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });
    });
  }
}
