import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrTableHeaderCellComponent } from './chr-table-header-cell.component';

describe('ChrTableHeaderCellComponent', () => {
  let component: ChrTableHeaderCellComponent;
  let fixture: ComponentFixture<ChrTableHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrTableHeaderCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrTableHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
