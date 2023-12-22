import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestCreationComponent } from './helprequest-creation.component';

describe('HelprequestCreationComponent', () => {
  let component: HelpRequestCreationComponent;
  let fixture: ComponentFixture<HelpRequestCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRequestCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpRequestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
