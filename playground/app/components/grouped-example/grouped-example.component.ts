import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { FsAutocompleteChipsSubtemplateDirective } from '../../../../src/app/directives/autocomplete-chips-subtemplate.directive';


@Component({
  selector: 'grouped-example',
  templateUrl: './grouped-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsSubtemplateDirective,
  ],
})
export class GroupedExampleComponent {

  public model = [];

  private _exampleService = inject(ExampleService);

  public fetch = (keyword) => {
    return this._exampleService.fetch(keyword, 15);
  };

  /**
   * Returning a label per item groups the panel into <mat-optgroup>s.
   */
  public groupBy = (item) => {
    return item.department;
  };

}
