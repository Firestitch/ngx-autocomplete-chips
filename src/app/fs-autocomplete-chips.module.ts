import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FsAutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
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
