import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrConfirmModalComponent } from './chr-confirm-modal.component';

describe('ChrDeleteModalComponent', () => {
  let component: ChrConfirmModalComponent;
  let fixture: ComponentFixture<ChrConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrConfirmModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
