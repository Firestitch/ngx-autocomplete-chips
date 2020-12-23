import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsArray } from '@firestitch/common';
import { FsApiModule, FsApi } from '@firestitch/api';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import {
  AutocompleteChipsExampleComponent,
  AutocompleteChipsOrderableExampleComponent,
  TextExampleComponent,
  LabelExampleComponent
} from './components';
import { EmailExampleComponent } from './components/email-example';
import { ExampleService } from './services/example.service';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsFormModule,
    FsApiModule,
    FsExampleModule.forRoot(),
    FsLabelModule,
    FsMessageModule.forRoot(),
    ToastrModule.forRoot(),
    FsAutocompleteChipsModule.forRoot(),
    AppMaterialModule,
  ],
  declarations: [
    AppComponent,

    AutocompleteChipsExampleComponent,
    AutocompleteChipsOrderableExampleComponent,
    LabelExampleComponent,
    TextExampleComponent,
    EmailExampleComponent
  ],
  providers: [
    FsArray,
    FsApi,
    ExampleService
  ],
})
export class PlaygroundModule {
}
