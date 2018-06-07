import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import {
  MatAutocompleteModule,
  MatChipsModule,
  MatInputModule,
  MatIconModule } from '@angular/material';

import {
  FsAutocompleteChipsComponent
} from './components';

import { FsAutocompleteChipDirective, FsAutocompleteDirective } from './directives';


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
    };
  }
}
