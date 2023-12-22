import { RouterService } from '../../services/router/router.service';
import { Component, Input } from '@angular/core';

export interface Breadcrumb {
  display: string,
  link?: string,
  callback?:Function,
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() crumbs:Breadcrumb[]

  constructor(public router:RouterService){

  }
}
