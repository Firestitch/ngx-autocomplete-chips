import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { FsChipModule } from '@firestitch/chip';
import { FsClearModule } from '@firestitch/clear';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';

import { ConfirmComponent } from './components';
import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsTextValidIndicatorDirective } from './directives';
import { FsAutocompleteChipsNoResultsDirective } from './directives/autocomplete-no-results/autocomplete-no-results.directive';
import { FsAutocompleteObjectDirective } from './directives/autocomplete-object/autocomplete-object.directive';
import { FsAutocompleteChipSuffixDirective } from './directives/chip-suffix/chip-suffix.directive';
import { FsAutocompleteChipsSuffixDirective } from './directives/chips-suffix/chips-suffix.directive';
import { FsAutocompleteChipsStaticDirective } from './directives/static-template/static-template.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,

    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,

    FsLabelModule,
    FsDialogModule,
    FsDialogModule,
    FsClearModule,
    FsChipModule,
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
  public static forRoot(): ModuleWithProviders<FsAutocompleteChipsModule> {
    return {
      ngModule: FsAutocompleteChipsModule,
    };
  }
}
