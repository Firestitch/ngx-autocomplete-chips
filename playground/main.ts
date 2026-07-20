import { enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FsApi, FsApiModule } from '@firestitch/api';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsArray } from '@firestitch/common';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';

import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { ExampleService } from './app/services/example.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, FsFormModule, FsApiModule, FsExampleModule.forRoot(), FsLabelModule, FsMessageModule.forRoot(), FsAutocompleteChipsModule.forRoot()),
    FsArray,
    FsApi,
    ExampleService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'auto', appearance: 'fill' },
    },
    provideAnimations(),
    provideRouter([]),
  ],
})
  .catch((err) => console.error(err));

