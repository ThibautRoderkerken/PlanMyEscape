import { TestBed } from '@angular/core/testing';

import { HelpRequestService } from './helprequest.service';

describe('HelprequestService', () => {
  let service: HelpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
