import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountChart } from './user-count-chart.component';

describe('InterventionTypeCountChart', () => {
  let component: UserCountChart;
  let fixture: ComponentFixture<UserCountChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCountChart ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCountChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
