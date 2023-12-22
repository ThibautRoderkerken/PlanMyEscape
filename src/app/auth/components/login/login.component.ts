import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../../services/toast/toast.service';
import { RouterService } from '../../../services/router/router.service';
import { ILoginDTO, LoginDTO } from '../../models/login';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  valid: boolean = false;
  loginDTO: ILoginDTO = new LoginDTO();

  constructor(
    private toast: ToastService,
    private auth: AuthService,
    private router: RouterService,
    private googleAuth: SocialAuthService
  ) {
    googleAuth.authState.subscribe(
      user =>
        {
          if(user) {
            this.auth.googleLogin(user).subscribe((res) => {
              this.router.navigateTo('');
              this.toast.setSuccess(
                `Connecté en tant que ${this.auth.getFirstname()} ${this.auth.getLastname()}`
              );
            });
          }
        }
    )
  }

  login = (value: any) => {
    if (this.valid)
      this.auth.login(this.loginDTO, '/').subscribe((res) => {
        this.router.navigateTo('');
        this.toast.setSuccess(
          `Connecté en tant que ${this.auth.getFirstname()} ${this.auth.getLastname()}`
        );
      });
  };
}
