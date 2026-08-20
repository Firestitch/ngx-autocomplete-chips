import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatIcon } from '@angular/material/icon';

import { FsMessage } from '@firestitch/message';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsNoResultsDirective } from '../../../../src/app/directives/autocomplete-no-results.directive';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { FsAutocompleteChipsPrefixDirective } from '../../../../src/app/directives/chips-prefix.directive';
import { FsAutocompleteChipsSuffixDirective } from '../../../../src/app/directives/chips-suffix.directive';
import { FsAutocompleteChipSelectedSuffixDirective } from '../../../../src/app/directives/selected-chip-suffix.directive';


@Component({
  selector: 'templates-example',
  templateUrl: './templates-example.component.html',
  styleUrls: ['./templates-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MatIcon,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsPrefixDirective,
    FsAutocompleteChipsSuffixDirective,
    FsAutocompleteChipSelectedSuffixDirective,
    FsAutocompleteChipsNoResultsDirective,
  ],
})
export class TemplatesExampleComponent {

  public model = [];

  private _exampleService = inject(ExampleService);
  private _message = inject(FsMessage);

  public fetch = (keyword) => {
    return this._exampleService.fetch(keyword, 8);
  };

  public configure(data: any): void {
    this._message.info(`Configure ${data.firstName} ${data.lastName}`);
  }

}
