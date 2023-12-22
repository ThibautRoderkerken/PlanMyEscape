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
import { ILoginDTO, IRegisterDTO, LoginDTO, RegisterDTO } from '../../models/login';
import { ActivatedRoute } from '@angular/router';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  valid: boolean = false;
  registerDTO: IRegisterDTO = new RegisterDTO();

  constructor(
    private toast: ToastService,
    private auth: AuthService,
    private router: RouterService,
    private route: ActivatedRoute,
    private googleAuth: SocialAuthService,
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.registerDTO.email = params['email'];
      }
    );
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

  register = (value: any) => {
    if (this.valid)
      this.auth.register(this.registerDTO, '/').subscribe((res) => {
        this.router.navigateTo('');
        this.toast.setSuccess(
          `Connecté en tant que ${this.auth.getFirstname()} ${this.auth.getLastname()}`
        );
      });
  };
}
