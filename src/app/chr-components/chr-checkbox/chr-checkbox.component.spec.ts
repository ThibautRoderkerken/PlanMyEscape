import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrCheckboxComponent } from './chr-checkbox.component';

describe('ChrCheckboxComponent', () => {
  let component: ChrCheckboxComponent;
  let fixture: ComponentFixture<ChrCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
