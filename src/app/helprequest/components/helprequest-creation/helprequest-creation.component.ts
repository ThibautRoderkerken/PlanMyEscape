import { Component } from '@angular/core';
import { HelpRequestService } from '../../services/helprequest.service';
import { RouterService } from 'src/app/services/router/router.service';
import { HelpRequest, IHelpRequest } from '../../models/helprequest';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-helprequest-creation',
  templateUrl: './helprequest-creation.component.html',
  styleUrls: ['./helprequest-creation.component.scss']
})
export class HelpRequestCreationComponent {
  public valid: boolean = false;
  public request: IHelpRequest = new HelpRequest();
  constructor(
    public service: HelpRequestService,
    private auth: AuthService,
    private router: RouterService,
    private toast: ToastService,
  ) {
    if(auth.isLoggedInAsync() ){
      this.request.email = `${auth.getEmail() || ""}`
      this.request.firstname = `${auth.getFirstname() || ""}`
      this.request.lastname = `${auth.getLastname() || ""}`
    }
  }
  post = () => {
    this.service.post(this.request).subscribe((res) => {
      this.router.navigateTo(`/helprequest/${res.id}`);
      this.toast.setSuccess();
    });
  };

  goBack = () => {
    this.router.navigateTo('helprequest');
  };
}
