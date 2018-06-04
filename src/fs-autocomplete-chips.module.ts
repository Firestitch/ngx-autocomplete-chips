import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FsAutocompleteChipsComponent
} from './components';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsAutocompleteChipsComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsAutocompleteChipsComponent,
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
