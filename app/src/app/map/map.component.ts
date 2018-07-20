import { Component, OnInit } from '@angular/core';
import { GeoService } from '../geo.service';
import { MbwmApiService } from '../mbwm-api.service';

type ITop10 = ILatLng & IStat;

interface ILatLng {
  lat: number;
  lng: number;
}

interface IStat {
  id: number;
  name: string;
  n: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor(private geo: GeoService, private mbwm: MbwmApiService) {}
  top10: ITop10[];
  loadingTop10: boolean;

  onEnter(value: string) {
    console.log(value);
    this.fetchByGenre(value);
  }

  ngOnInit() {
    this.fetchByGenre('ska');
  }

  fetchByGenre(genre: string) {
    this.loadingTop10 = true;
    this.mbwm
      .getNReleasesOfGenreByCountry(genre)
      .toPromise()
      .then(stats => {
        if (!stats || stats.length < 0) {
          alert('Genre is invalid!');
          this.loadingTop10 = false;
          return;
        }
        this.mbwm
          .getAllCountries()
          .toPromise()
          .then(res => {
            const top10stats = Object.keys(stats)
              .filter(k => stats[k] > 0)
              .sort((k1, k2) => stats[k2] - stats[k1])
              .slice(0, 10)
              .map(k => Object.assign({}, res.find(c => c.id === +k), { n: stats[k] as number })) as IStat[];
            Promise.all(
              top10stats.map(async st => {
                return this.geo.getGeoByCountryName(st.name);
              })
            ).then(geos => {
              const gs = geos.map(g => g[0]) as google.maps.GeocoderResult[];
              this.top10 = gs.map((g, i) => {
                this.loadingTop10 = false;
                return {
                  lat: g.geometry.location.lat(),
                  lng: g.geometry.location.lng(),
                  ...top10stats[i]
                };
              });
            });
          });
      });
  }
}
