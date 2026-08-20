import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';


@Component({
  selector: 'orderable-example',
  templateUrl: './orderable-example.component.html',
  styleUrls: ['./orderable-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
  ],
})
export class OrderableExampleComponent implements OnInit {

  public model = [];
  public lastMove: { from: number, to: number, name: string } = null;

  private _cdRef = inject(ChangeDetectorRef);
  private _exampleService = inject(ExampleService);

  public ngOnInit(): void {
    this.model = this._exampleService.people.slice(0, 4);
  }

  public fetch = (keyword) => {
    return this._exampleService.fetch(keyword, 10);
  };

  /**
   * `reordered` fires after the drop with the moved item, its old and new
   * index, and the reordered model.
   */
  public reordered(event): void {
    this.lastMove = {
      from: event.from,
      to: event.to,
      name: `${event.item.data.firstName} ${event.item.data.lastName}`,
    };

    this._cdRef.markForCheck();
  }

}
