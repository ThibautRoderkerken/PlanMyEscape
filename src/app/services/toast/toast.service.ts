import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, merge, Subject, timer, map } from 'rxjs';
import { concatMap, finalize, take } from 'rxjs/operators';

export interface Toast {
  type: 'error' | 'success' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Subject<Toast[]> = new Subject<Toast[]>();

  constructor(private router: Router) {
    this.toasts.next([]);
  }

  public toast() {
    return this.toasts.asObservable();
  }

  public setSuccess(message?: string, time?: number) {
    this.toasts.next([
      {
        type: 'success',
        message: message ? message : "L'opéation s'est déroulée avec succès.",
        duration: time,
      },
    ]);
    /*
        this.success_message = message ? message : "L'opéation s'est déroulée avec succès."
        this.show_success = true
        setTimeout(()=>{
            this.show_success = false
        }, time ? time*1000 : 10000)
        */
  }

  public setError(message: string, time?: number) {
    this.toasts.next([{ type: 'error', message: message, duration: time }]);
    /*
        this.error_message = message
        this.show_error = true

        setTimeout(()=>{
            this.show_error = false
        }, time ? time*1000 : 10000)
        */
  }

  public setWarning(message: string, time?: number) {
    this.toasts.next([{ type: 'warning', message: message, duration: time }]);
    /*
        this.error_message = message
        this.show_error = true

        setTimeout(()=>{
            this.show_error = false
        }, time ? time*1000 : 10000)
        */
  }
}
