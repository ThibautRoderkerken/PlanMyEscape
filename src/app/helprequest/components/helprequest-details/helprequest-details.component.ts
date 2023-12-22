import { Component } from '@angular/core';
import { HelpRequest, IHelpRequest } from '../../models/helprequest';
import { HelpRequestService } from '../../services/helprequest.service';
import { RouterService } from 'src/app/services/router/router.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { DialogService } from 'src/app/chr-components/services/dialog.service';

@Component({
  selector: 'app-helprequest-details',
  templateUrl: './helprequest-details.component.html',
  styleUrls: ['./helprequest-details.component.scss']
})
export class HelpRequestDetailsComponent {
  public valid: boolean = false;
  public request: IHelpRequest = new HelpRequest();
  public is_locked: boolean = true;

  constructor(
    public service: HelpRequestService,
    private router: RouterService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private dialogService:DialogService,
    public auth: AuthService,
  ) {
    this.load()
  }
  put = () => {
    this.service.put(this.request).subscribe((res) => {
      this.router.navigateTo(`/helprequest/${res.id}`);
      this.toast.setSuccess();
    });
  };

  toggleLock = () => {
    this.is_locked = !this.is_locked;
    this.load()
  };

  load = () => {
    this.service
      .getById(this.route.snapshot.paramMap.get('request_id')!)
      .subscribe((res) => {
        this.request = res
    });  
  };

  openDeleteDialog = () => {
    const dialogRef = this.dialogService.openDelete(this.delete);
  };

  publish = () => {
    this.request.isSolved = true
    this.put()
  }

  openConfirmDialog = () => {
    const dialogRef = this.dialogService.openConfirm(this.publish);
  };

  delete = () => {
    this.service.delete(this.request).subscribe((res) => {
      this.router.navigateToRequestList();
      this.toast.setSuccess(
        `La requête a bien été supprimée`
      );
    });
  };

  goBack = () => {
    this.router.navigateTo('helprequest');
  };
}
