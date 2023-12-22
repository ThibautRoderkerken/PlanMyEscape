import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { RouterService } from 'src/app/services/router/router.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { IChatMessage, IChatRoom } from '../models/chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private base_url: string = `${environment.apiUrl}chat/`;

  constructor(private http: HttpClient, private router: RouterService, private auth:AuthService) {}

  get = () => {
    return this.http.get(this.base_url).pipe(map((data) => data as IChatRoom[]));
  };

  getById = (id: string | number) => {
    return this.http
      .get(`${this.base_url}${id}`)
      .pipe(map((data) => data as IChatRoom));
  };

  put = (holiday: IChatRoom) => {
    return this.http
      .put(`${this.base_url}${holiday.id}`, holiday, {})
      .pipe(map((data) => data as IChatRoom));
  };

  post(message: IChatMessage) {
    return this.http
      .post(`${this.base_url}`, message)
      .pipe(map((data) => data as IChatMessage));
  }
  

  delete = (holiday: IChatRoom) => {
    return this.http.delete(`${this.base_url}${holiday.id}`);
  };
}
