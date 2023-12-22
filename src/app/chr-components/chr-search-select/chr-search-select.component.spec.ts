import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrSearchSelectComponent } from './chr-search-select.component';

describe('ChrSearchSelectComponent', () => {
  let component: ChrSearchSelectComponent;
  let fixture: ComponentFixture<ChrSearchSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrSearchSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrSearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
