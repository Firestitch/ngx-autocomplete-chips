import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { FsArray } from '@firestitch/common';
import { FsApi, FsApiModule } from '@firestitch/api';
import { ExampleService } from './app/services/example.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsExampleModule } from '@firestitch/example';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

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
            useValue: { floatLabel: 'auto', appearance: 'outline' },
        },
        provideAnimations(),
        provideRouter([]),
    ]
})
  .catch(err => console.error(err));

