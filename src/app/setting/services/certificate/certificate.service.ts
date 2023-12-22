import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { ICertificate } from '../../models/certificate';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private base_url: string = `${environment.apiUrl}certificate/`;

  constructor(private http: HttpClient, private router: RouterService) {}

  get = () => {
    return this.http
      .get(`${this.base_url}`)
      .pipe(map((data) => data as ICertificate[]));
  };

  getById = (id: string) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data as ICertificate));
  };

  put = (certificate: ICertificate) => {
    return this.http
      .put(`${this.base_url}${certificate.id}`, certificate, {})
      .pipe(map((data) => data as ICertificate));
  };

  post = (certificate: ICertificate) => {
    return this.http
      .post(`${this.base_url}`, certificate, {})
      .pipe(map((data) => data as ICertificate));
  };

  delete = (certificate: ICertificate) => {
    return this.http.delete(`${this.base_url}${certificate.id}`);
  };

  hasWarning = () => {
    return this.get().pipe(
      map((date) =>
        date.filter((c) => {
          const expiresAt = moment(c.expiresAt);
          const days = expiresAt.diff(moment(new Date()), 'days');
          return days <= c.renewWarningWithin;
        })
      )
    );
  };
}
