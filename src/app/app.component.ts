import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth/auth.service';
import { RouterService } from './services/router/router.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockManager';

  constructor(private auth:AuthService, private router:RouterService){
    this.auth.init()

  // the second parameter 'fr' is optional
  registerLocaleData(localeFr, 'fr');
  }
}
