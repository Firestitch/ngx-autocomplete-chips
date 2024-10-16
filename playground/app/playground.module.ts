import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FsApi, FsApiModule } from '@firestitch/api';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsArray } from '@firestitch/common';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  AutocompleteChipsExampleComponent,
  AutocompleteChipsOrderableExampleComponent,
  LabelExampleComponent,
  StatusExampleComponent,
  TextExampleComponent,
} from './components';
import { EmailExampleComponent } from './components/email-example';
import { AppMaterialModule } from './material.module';
import { ExampleService } from './services/example.service';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsFormModule,
    FsApiModule,
    FsExampleModule.forRoot(),
    FsLabelModule,
    FsMessageModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    AppMaterialModule,
    RouterModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    AutocompleteChipsExampleComponent,
    AutocompleteChipsOrderableExampleComponent,
    LabelExampleComponent,
    StatusExampleComponent,
    TextExampleComponent,
    EmailExampleComponent,
  ],
  providers: [
    FsArray,
    FsApi,
    ExampleService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto', appearance: 'outline' },
    },
  ],
})
export class PlaygroundModule {
}
