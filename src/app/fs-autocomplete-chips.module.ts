import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsBadgeModule } from '@firestitch/badge';

import {
  MatAutocompleteModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule } from '@angular/material';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';

import { FsAutocompleteDirective } from './directives/autocomplete/autocomplete.directive';
import { FsAutocompleteChipDirective } from './directives/autocomplete-chip/autocomplete-chip.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExampleService } from 'playground/app/services/example.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsBadgeModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    DragDropModule
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
    ExampleService
  ],
})
export class FsAutocompleteChipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAutocompleteChipsModule,
      providers: [
      ]
    };
  }
}
