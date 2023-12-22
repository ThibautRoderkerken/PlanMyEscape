import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrSearchbarComponent } from './chr-searchbar.component';

describe('ChrSearchbarComponent', () => {
  let component: ChrSearchbarComponent;
  let fixture: ComponentFixture<ChrSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrSearchbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
