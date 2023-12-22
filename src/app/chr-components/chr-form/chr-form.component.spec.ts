import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrFormComponent } from './chr-form.component';

describe('ChrFormComponent', () => {
  let component: ChrFormComponent;
  let fixture: ComponentFixture<ChrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
