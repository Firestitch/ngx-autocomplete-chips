import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule } from '@angular/material';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FsAutocompleteObjectDirective } from './directives/autocomplete-object/autocomplete-object.directive';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    DragDropModule
  ],
  exports: [
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective
  ],
  declarations: [
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsComponent
  ]
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
