import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestDetailsComponent } from './helprequest-details.component';

describe('HelprequestDetailsComponent', () => {
  let component: HelpRequestDetailsComponent;
  let fixture: ComponentFixture<HelpRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
