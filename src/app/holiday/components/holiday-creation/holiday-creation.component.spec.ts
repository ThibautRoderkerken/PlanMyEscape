import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCreationComponent } from './holiday-creation.component';

describe('HolidayCreationComponent', () => {
  let component: HolidayCreationComponent;
  let fixture: ComponentFixture<HolidayCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
