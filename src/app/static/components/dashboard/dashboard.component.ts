import { Component} from '@angular/core';
import { RouterService } from '../../../services/router/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router:RouterService){

  }

  ngOnInit(){ 
    
   }

}
