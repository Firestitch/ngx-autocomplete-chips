import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsTextValidIndicatorDirective } from '../../../../src/app/directives/text-valid-indicator.directive';


@Component({
  selector: 'text-example',
  templateUrl: './text-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    FsAutocompleteChipsComponent,
    FsAutocompleteChipsTextValidIndicatorDirective,
  ],
})
export class TextExampleComponent {

  public model = ['angular', 'chips'];

  /** With allowObject off, fetch is never called, but the input is still required. */
  public fetch = () => {
    return of([]);
  };

  /** Rejects anything shorter than two characters or containing a space. */
  public validateText = (text: string): boolean => {
    const value = String(text).trim();

    return value.length >= 2 && value.indexOf(' ') === -1;
  };

}
