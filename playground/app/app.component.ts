import { Component } from '@angular/core';

import { FsExampleModule } from '@firestitch/example';

import { environment } from '../environments/environment';

import { DialogExampleComponent } from './components/dialog-example';
import { EmailExampleComponent } from './components/email-example';
import { GroupedExampleComponent } from './components/grouped-example';
import { KitchenSinkExampleComponent } from './components/kitchen-sink-example';
import { OrderableExampleComponent } from './components/orderable-example';
import { ReactiveFormExampleComponent } from './components/reactive-form-example';
import { StaticOptionsExampleComponent } from './components/static-options-example';
import { StatusExampleComponent } from './components/status-example';
import { TemplatesExampleComponent } from './components/templates-example';
import { TextExampleComponent } from './components/text-example';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FsExampleModule,
    KitchenSinkExampleComponent,
    TemplatesExampleComponent,
    GroupedExampleComponent,
    StaticOptionsExampleComponent,
    OrderableExampleComponent,
    StatusExampleComponent,
    TextExampleComponent,
    EmailExampleComponent,
    ReactiveFormExampleComponent,
    DialogExampleComponent,
  ],
})
export class AppComponent {
  public config = environment;
}
