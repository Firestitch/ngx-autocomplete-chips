import { Component, OnInit } from '@angular/core';
import { FsMessage } from '@firestitch/message';
import { ExampleService } from 'playground/app/services/example.service';
import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'autocomplete-chips-orderable-example',
    templateUrl: './autocomplete-chips-orderable-example.component.html',
    standalone: true,
    imports: [FsAutocompleteChipsComponent, FormsModule, FsFormModule, FsAutocompleteObjectDirective, JsonPipe]
})
export class AutocompleteChipsOrderableExampleComponent implements OnInit {

  public model = [];

  constructor(
    private _exampleService: ExampleService,
    private _message: FsMessage,
  ) { }

  public ngOnInit() {
    this._exampleService.fetch('', 3)
      .subscribe((response) => {
        this.model = response;
      });
  }

  public fetch = (keyword, existing) => {
    return this._exampleService.fetch(keyword, existing);
  }


  public click(event: MouseEvent, data) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    this._message.success('Launch clicked');
  }
}
