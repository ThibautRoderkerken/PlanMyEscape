import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrSeparatorComponent } from './chr-separator.component';

describe('ChrSeparatorComponent', () => {
  let component: ChrSeparatorComponent;
  let fixture: ComponentFixture<ChrSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrSeparatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
