import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHolidayChart } from './user-holiday-chart.component';

describe('InterventionTypeCountChart', () => {
  let component: UserHolidayChart;
  let fixture: ComponentFixture<UserHolidayChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHolidayChart ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHolidayChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
