import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsArray } from '@firestitch/common';
import { FsApiModule, FsApi } from '@firestitch/api';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import {
  AutocompleteChipsExampleComponent,
  AutocompleteChipsOrderableExampleComponent,
  AutocompleteChipsGroupsExampleComponent,
  TextExampleComponent
} from './components';
import { EmailExampleComponent } from './components/email-example';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsFormModule,
    FsApiModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    AppMaterialModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,

    AutocompleteChipsExampleComponent,
    AutocompleteChipsOrderableExampleComponent,
    AutocompleteChipsGroupsExampleComponent,
    TextExampleComponent,
    EmailExampleComponent
  ],
  providers: [
    FsArray,
    FsApi
  ],
})
export class PlaygroundModule {
}