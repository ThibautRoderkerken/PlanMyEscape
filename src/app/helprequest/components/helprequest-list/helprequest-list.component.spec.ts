import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestListComponent } from './helprequest-list.component';

describe('HelprequestListComponent', () => {
  let component: HelpRequestListComponent;
  let fixture: ComponentFixture<HelpRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
