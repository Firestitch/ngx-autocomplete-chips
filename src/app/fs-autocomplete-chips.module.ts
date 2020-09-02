import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FsLabelModule } from '@firestitch/label';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from './directives/autocomplete-object/autocomplete-object.directive';
import { FsAutocompleteChipsNoResultsDirective } from './directives/autocomplete-no-results/autocomplete-no-results.directive';
import { FsAutocompleteChipsStaticDirective } from './directives/static-template/static-template.directive';

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

    FsLabelModule,
  ],
  exports: [
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective
  ],
  declarations: [
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsComponent,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective
  ],
})
export class FsAutocompleteChipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAutocompleteChipsModule,
    };
  }
}
