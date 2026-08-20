import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatIcon } from '@angular/material/icon';

import { FsMessage } from '@firestitch/message';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsNoResultsDirective } from '../../../../src/app/directives/autocomplete-no-results.directive';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { FsAutocompleteChipsStaticDirective } from '../../../../src/app/directives/static-template.directive';


@Component({
  selector: 'static-options-example',
  templateUrl: './static-options-example.component.html',
  styleUrls: ['./static-options-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MatIcon,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsNoResultsDirective,
  ],
})
export class StaticOptionsExampleComponent {

  @ViewChild(FsAutocompleteChipsComponent)
  public autocomplete: FsAutocompleteChipsComponent;

  public model = [];

  private _cdRef = inject(ChangeDetectorRef);
  private _exampleService = inject(ExampleService);
  private _message = inject(FsMessage);

  public fetch = (keyword) => {
    return this._exampleService.fetch(keyword, 8);
  };

  /** Static rows can decide per keystroke whether they show and whether they are enabled. */
  public showWithKeyword = (keyword: string): boolean => {
    return !!keyword;
  };

  public disableWhenShort = (keyword: string): boolean => {
    return String(keyword || '').length < 3;
  };

  public selectAll(): void {
    this.autocomplete.selectAll();
    this._message.success('Added every visible result');
  }

  /**
   * `selected` carries the current keyword, which is the hook for a
   * "create what the user typed" row.
   */
  public create(keyword: string): void {
    const [firstName, ...rest] = String(keyword).trim().split(' ');

    const person = {
      id: null,
      firstName,
      lastName: rest.join(' '),
      department: 'Unassigned',
    };

    this.model = [...this.model, person];
    this._message.success(`Created ${keyword}`);
    this._cdRef.markForCheck();
  }

  public invite(keyword: string): void {
    this._message.info(`Invite sent to ${keyword}`);
  }

}
