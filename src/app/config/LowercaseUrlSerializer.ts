import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    url = url.toLowerCase().replace('PlanMyEscape', '');
    return super.parse(url);
  }
}
