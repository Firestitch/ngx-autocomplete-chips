import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
import { FsAutocompleteChipsNoResultsDirective } from './directives/autocomplete-no-results.directive';
import { FsAutocompleteObjectDirective } from './directives/autocomplete-object.directive';
import { FsAutocompleteChipsSuffixDirective } from './directives/chips-suffix.directive';
import { FsAutocompleteChipSelectedSuffixDirective } from './directives/selected-chip-suffix.directive';
import { FsAutocompleteChipsStaticDirective } from './directives/static-template.directive';
import { AutoSizeInputModule } from './modules/ngx-autosize-input/src';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,

    FsLabelModule,
    FsDialogModule,
    FsDialogModule,
    FsClearModule,
    FsChipModule,

    AutoSizeInputModule,
  ],
  exports: [
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective,
    FsAutocompleteChipSelectedSuffixDirective,
    FsAutocompleteChipsSuffixDirective,
    FsAutocompleteChipsTextValidIndicatorDirective,
  ],
  declarations: [
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsComponent,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective,
    FsAutocompleteChipSelectedSuffixDirective,
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
