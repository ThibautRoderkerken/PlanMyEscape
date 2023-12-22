import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Toast, ToastService } from '../../../services/toast/toast.service';
import { RouterService } from '../../../services/router/router.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CertificateService } from '../../../setting/services/certificate/certificate.service';
import { ICertificate } from '../../../setting/models/certificate';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('shown', style({ display: 'block', opacity: 1 })),
      state('hidden', style({ display: 'none', opacity: 0 })),
      transition('hidden => shown', [
        animate('1s'),
        //animate('1s 300ms ease-in', style({display:'block', opacity:1}))
      ]),
      transition('shown => hidden', [
        animate('1s'),
        //animate('1s 300ms ease-out', style({display:'none', opacity:0}))
      ]),
    ]),
  ],
})
export class HeaderComponent {
  successes: Toast[] = [];
  errors: Toast[] = [];
  warnings: Toast[] = [];
  shouldShowSuccess = true;
  shouldShowError = true;
  shouldShowWarning = true;
  is_opened: boolean;
  certificates: ICertificate[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public certificateService: CertificateService,
    public toast: ToastService,
    private router: RouterService,
    private googleAuth: SocialAuthService,
  ) {
    toast.toast().subscribe((res) => {
      this.successes = [
        ...this.successes,
        ...res.filter((t) => t.type == 'success'),
      ];
      this.errors = [...this.errors, ...res.filter((t) => t.type == 'error')];
      this.warnings = [
        ...this.warnings,
        ...res.filter((t) => t.type == 'warning'),
      ];
    });
    if (auth.isLoggedIn())
      auth.hasAuthorityAsync('ADM').subscribe((res) => {
        if (res)
          certificateService.hasWarning().subscribe((res) => {
            this.certificates = res;
          });
      });
  }

  successTimeout() {
    const current = this.successes[0];
    if (!this.shouldShowSuccess) return current;
    setTimeout(() => {
      const success = this.successes.shift();
      this.shouldShowSuccess = true;
    }, current.duration || 8000);
    this.shouldShowSuccess = false;
    return current;
  }

  errorTimeout() {
    const current = this.errors[0];
    if (!this.shouldShowError) return current;
    setTimeout(() => {
      const error = this.errors.shift();
      this.shouldShowError = true;
    }, current.duration || 8000);
    this.shouldShowError = false;
    return current;
  }

  warningTimeout() {
    const current = this.warnings[0];
    if (!this.shouldShowWarning) return current;
    setTimeout(() => {
      const warning = this.warnings.shift();
      this.shouldShowWarning = true;
    }, current.duration || 8000);
    this.shouldShowWarning = false;
    return current;
  }

  toggle() {
    this.is_opened = !this.is_opened;
  }

  //This is only to smoothen the buttons and allow us to modify urls for both the burger menu and the toolbar at the same time
  goToLogout() {
    this.googleAuth.signOut().then(
      res=>{
        this.auth.logout().subscribe((res) => {
          this.toast.setSuccess('Déconnexion réussie !');
        });
        this.goToLogin();
      }
    )
    this.auth.logout().subscribe((res) => {
      this.toast.setSuccess('Déconnexion réussie !');
    });
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigateTo('login');
  }

  goToRegister() {
    this.router.navigateTo('register');
  }
  goToHelpRequest() {
    this.router.navigateTo('helprequest');
  }

  goToHelpRequestCreation() {
    this.router.navigateTo('helprequest/create');
  }

  goToUser() {
    this.router.navigateTo('user');
  }

  goToHoliday() {
    this.router.navigateTo('holiday');
  }

  goToChats() {
    this.router.navigateTo('chat');
  }

  goToUnit() {
    this.router.navigateTo('unit');
  }

  goToDashboard() {
    this.router.navigateTo('');
  }

  goToItem() {
    this.router.navigateTo('item');
  }

  goToLicence() {
    this.router.navigateTo('licence');
  }

  goToIntervention() {
    this.router.navigateTo('intervention');
  }

  goToOrder() {
    this.router.navigateTo('order');
  }

  goToSettings() {
    this.router.navigateTo('settings');
  }

  goToStat() {
    this.router.navigateTo('statistics');
  }
}
