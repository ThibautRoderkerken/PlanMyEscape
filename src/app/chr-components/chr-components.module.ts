import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChrCheckboxComponent } from './chr-checkbox/chr-checkbox.component';
import { BreadcrumbComponent } from './chr-breadcrumb/breadcrumb.component';
import { MatButtonModule } from '@angular/material/button';
import { ChrButtonComponent } from './chr-button/chr-button.component';
import { ChrSearchSelectComponent } from './chr-search-select/chr-search-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ChrSearchbarComponent } from './chr-searchbar/chr-searchbar.component';
import { ChrTableComponent } from './chr-table/chr-table.component';
import { ChrTableHeaderCellComponent } from './chr-table-header-cell/chr-table-header-cell.component';
import { ChrFormComponent } from './chr-form/chr-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChrSeparatorComponent } from './chr-separator/chr-separator.component';
import { PipeModule } from '../pipe/pipe.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TypeValidatorDirective } from './chr-form/chr-validators/type-validator';
import { DecimalValidatorDirective } from './chr-form/chr-validators/decimal-validator';
import { MaxDateValidatorDirective } from './chr-form/chr-validators/max-date-validator';
import { ChrDeleteModalComponent } from './chr-delete-modal/chr-delete-modal.component';
import { SameAsValidatorDirective } from './chr-form/chr-validators/sameAs-validator';
import { ChrConfirmModalComponent } from './chr-confirm-modal/chr-confirm-modal.component';

@NgModule({
  declarations: [
    ChrCheckboxComponent,
    BreadcrumbComponent,
    ChrButtonComponent,
    ChrSearchSelectComponent,
    ChrSearchbarComponent,
    ChrTableComponent,
    ChrTableHeaderCellComponent,
    ChrFormComponent,
    ChrSeparatorComponent,
    ChrDeleteModalComponent,
    ChrConfirmModalComponent,
    TypeValidatorDirective,
    DecimalValidatorDirective,
    MaxDateValidatorDirective,
    SameAsValidatorDirective,
  ],
  exports: [
    ChrCheckboxComponent,
    BreadcrumbComponent,
    ChrButtonComponent,
    ChrSearchSelectComponent,
    ChrSearchbarComponent,
    ChrTableComponent,
    ChrTableHeaderCellComponent,
    ChrFormComponent,
    ChrSeparatorComponent,
    ChrDeleteModalComponent,
    ChrConfirmModalComponent,
    TypeValidatorDirective,
    DecimalValidatorDirective,
    MaxDateValidatorDirective,
    SameAsValidatorDirective,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    PipeModule,
  ],
})
export class ChrComponentsModule {}
