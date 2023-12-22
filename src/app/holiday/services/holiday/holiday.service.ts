import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { IHoliday } from '../../models/holiday';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { MapGeocoder } from '@angular/google-maps';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private base_url: string = `${environment.apiUrl}holiday/`;
  private calendar_url: string = `${environment.apiUrl}calendar/`;

  constructor(private http: HttpClient, private router: RouterService, private auth:AuthService, private geocoder: MapGeocoder) {}

  get = () => {
    return this.http.get(this.base_url).pipe(map((data) => data as IHoliday[]));
  };

  getById = (id: string) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data as IHoliday));
  };

  allCalendar = () => {
    return this.http.get(`${this.calendar_url}`, {responseType:'text'});
  };

  calendar = (holiday: IHoliday) => {
    return this.http.get(`${this.calendar_url}${holiday.id}`, {responseType:'text'});
  };

  weather = (holiday: IHoliday) => {
    return this.http.get(`https://weatherapi-com.p.rapidapi.com/forecast.json`, 
    {
      headers: new HttpHeaders({
      'X-RapidAPI-Key': environment.rapidAPIKey,
      'X-RapidAPI-Host': environment.rapidAPIHost
      }), 
      params: new HttpParams().set('q', holiday.city).set('days', 5)
    },
  )
    this.geocoder.geocode({
      address: 'Rue Pierre Hauzeur 19, 4860, pepinster, belgique'
    }).subscribe(r=>(r))
    //return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${holiday.destination.replace(" ", ",")}&APPID=${environment.weatherAPIKey}&units=metric`)
    //return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=51.3131&longitude=3.1323&current=temperature_2m,rain&hourly=temperature_2m&timezone=Europe%2FLondon`)
  }

  put = (holiday: IHoliday) => {
    return this.http
      .put(`${this.base_url}${holiday.id}`, holiday, {})
      .pipe(map((data) => data as IHoliday));
  };

  post(holiday: IHoliday) {
    return this.http
      .post(`${this.base_url}`, holiday)
      .pipe(map((data) => data as IHoliday));
  }

  delete = (holiday: IHoliday) => {
    return this.http.delete(`${this.base_url}${holiday.id}`);
  };

  country = () => {
    return this.http
    .get(`${environment.apiUrl}country`)
    .pipe(map((data) => data as any[]));
  }

  countryDisplay = (country: any) => {
    return `${country?.name}`
  }

  isUserOwner = (holiday: IHoliday) => {
    return holiday?.owner?.id == this.auth.getId()
  }
}
