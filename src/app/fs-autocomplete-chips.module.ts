import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FsLabelModule } from '@firestitch/label';
import { FsDialogModule } from '@firestitch/dialog';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from './directives/autocomplete-object/autocomplete-object.directive';
import { FsAutocompleteChipsNoResultsDirective } from './directives/autocomplete-no-results/autocomplete-no-results.directive';
import { FsAutocompleteChipsStaticDirective } from './directives/static-template/static-template.directive';
import { FsAutocompleteChipSuffixDirective } from './directives/chip-suffix/chip-suffix.directive';
import { FsAutocompleteChipsSuffixDirective } from './directives/chips-suffix/chips-suffix.directive';
import { FsAutocompleteChipsTextValidIndicatorDirective } from './directives';
import { ConfirmComponent } from './components';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,

    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    FsDialogModule,
    MatButtonModule,

    FsLabelModule,
    FsDialogModule,
  ],
  exports: [
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective,
    FsAutocompleteChipSuffixDirective,
    FsAutocompleteChipsSuffixDirective,
    FsAutocompleteChipsTextValidIndicatorDirective,
  ],
  declarations: [
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsComponent,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective,
    FsAutocompleteChipSuffixDirective,
    FsAutocompleteChipsSuffixDirective,
    FsAutocompleteChipsTextValidIndicatorDirective,
    ConfirmComponent,
  ],
})
export class FsAutocompleteChipsModule {
  static forRoot(): ModuleWithProviders<FsAutocompleteChipsModule> {
    return {
      ngModule: FsAutocompleteChipsModule,
    };
  }
}
