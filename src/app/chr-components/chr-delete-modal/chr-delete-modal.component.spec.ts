import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrDeleteModalComponent } from './chr-delete-modal.component';

describe('ChrDeleteModalComponent', () => {
  let component: ChrDeleteModalComponent;
  let fixture: ComponentFixture<ChrDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
