import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrButtonComponent } from './chr-button.component';

describe('ChrButtonComponent', () => {
  let component: ChrButtonComponent;
  let fixture: ComponentFixture<ChrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
