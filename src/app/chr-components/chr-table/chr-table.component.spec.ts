import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrTableComponent } from './chr-table.component';

describe('ChrTableComponent', () => {
  let component: ChrTableComponent;
  let fixture: ComponentFixture<ChrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
