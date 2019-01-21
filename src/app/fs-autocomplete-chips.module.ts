import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import {
  MatAutocompleteModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule } from '@angular/material';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';

import { FsAutocompleteDirective } from './directives/autocomplete/autocomplete.directive';
import { FsAutocompleteChipDirective } from './directives/autocomplete-chip/autocomplete-chip.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    FsAutocompleteChipsComponent,
    FsAutocompleteChipDirective,
    FsAutocompleteDirective
  ],
  entryComponents: [
  ],
  declarations: [
    FsAutocompleteChipsComponent,
    FsAutocompleteChipDirective,
    FsAutocompleteDirective
  ],
  providers: [
  ],
})
export class FsAutocompleteChipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAutocompleteChipsModule,
      providers: [
        DragulaService,
      ]
    };
  }
}
