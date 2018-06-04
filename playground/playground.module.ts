import './styles.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsArray } from '@firestitch/common';

import { FsAutocompleteChipsModule } from '../src';

import { AppComponent } from './app/app.component';
import { AppMaterialModule } from './app/material.module';
import { AutocompleteChipsExampleComponent } from './app/components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    FsExampleModule,

    FsAutocompleteChipsModule,

    AppMaterialModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,

    AutocompleteChipsExampleComponent
  ],
  providers: [
    FsArray,
  ],
})
export class PlaygroundModule {
}
