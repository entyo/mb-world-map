import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICountry {
  id: number;
  name: string;
}

interface IStats {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class MbwmApiService {
  private ENDPOINT = 'localhost:3000';
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<ICountry[]>(`http://${this.ENDPOINT}/countries`);
  }

  getNReleasesOfGenreByCountry(genre: string) {
    return this.http.get<IStats[]>(`http://${this.ENDPOINT}/releases?genre=${genre}`);
  }
}
