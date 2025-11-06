import { ChangeDetectionStrategy, Component } from '@angular/core';

import { email } from '@firestitch/common';

import { of } from 'rxjs';
import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteChipsTextValidIndicatorDirective } from '../../../../src/app/directives/text-valid-indicator.directive';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'email-example',
    templateUrl: './email-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsAutocompleteChipsComponent,
        FormsModule,
        FsFormModule,
        FsAutocompleteChipsTextValidIndicatorDirective,
        FsAutocompleteObjectDirective,
        JsonPipe,
    ],
})
export class EmailExampleComponent {

  public model = ['bob@email.com'];

  public validateText = (e) => {
    return email(e);
  };

  public fetch = (e) => {
    return of(['bob@email.com', 'john@email.com']); 
  };
}
