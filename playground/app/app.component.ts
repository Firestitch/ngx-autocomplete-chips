import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { AutocompleteChipsExampleComponent } from './components/autocomplete-chips-example/autocomplete-chips-example.component';
import { AutocompleteChipsOrderableExampleComponent } from './components/autocomplete-chips-orderable-example/autocomplete-chips-orderable-example.component';
import { EmailExampleComponent } from './components/email-example/email-example.component';
import { TextExampleComponent } from './components/text-example/text-example.component';
import { StatusExampleComponent } from './components/status-example/status-example.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [FsExampleModule, AutocompleteChipsExampleComponent, AutocompleteChipsOrderableExampleComponent, EmailExampleComponent, TextExampleComponent, StatusExampleComponent]
})
export class AppComponent {
  public config = environment;
}