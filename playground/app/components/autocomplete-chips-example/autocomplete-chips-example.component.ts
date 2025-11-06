import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { email } from '@firestitch/common';
import { FsMessage } from '@firestitch/message';

import { delay, map } from 'rxjs/operators';

import { ExampleService } from 'playground/app/services/example.service';

import { DialogComponent } from '../dialog';

import { FsAutocompleteChipsComponent } from './../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsComponent as FsAutocompleteChipsComponent_1 } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { FsAutocompleteChipsPrefixDirective } from '../../../../src/app/directives/chips-prefix.directive';
import { FsAutocompleteChipSelectedSuffixDirective } from '../../../../src/app/directives/selected-chip-suffix.directive';
import { FsAutocompleteChipsStaticDirective } from '../../../../src/app/directives/static-template.directive';
import { FsAutocompleteChipsSubtemplateDirective } from '../../../../src/app/directives/autocomplete-chips-subtemplate.directive';
import { FsAutocompleteChipsNoResultsDirective } from '../../../../src/app/directives/autocomplete-no-results.directive';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'autocomplete-chips-example',
    styleUrls: ['./autocomplete-chips-example.component.scss'],
    templateUrl: './autocomplete-chips-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsAutocompleteChipsComponent_1,
        FormsModule,
        FsFormModule,
        FsAutocompleteObjectDirective,
        FsAutocompleteChipsPrefixDirective,
        FsAutocompleteChipSelectedSuffixDirective,
        FsAutocompleteChipsStaticDirective,
        FsAutocompleteChipsSubtemplateDirective,
        FsAutocompleteChipsNoResultsDirective,
        MatTabGroup,
        MatTab,
        MatCheckbox,
        MatRadioGroup,
        MatRadioButton,
        JsonPipe,
    ],
})
export class AutocompleteChipsExampleComponent implements OnInit {

  @ViewChild(FsAutocompleteChipsComponent)
  public autocomplete: FsAutocompleteChipsComponent;

  public model = null;
  public activeFirstName;

  public config: any = {
    disabled: false,
    multiple: true,
    fetchOnFocus: true,
    removable: true,
    image: true,
    color: true,
    orderable: true,
    size: 'small',
    shape: 'roundChip',
  };

  private _dialog = inject(MatDialog);
  private _exampleService = inject(ExampleService);
  private _message = inject(FsMessage);

  public ngOnInit() {
    this.model = this.mapData([this._exampleService.people[0]]);
  }

  public selected(keyword) {
    console.log('Selected', keyword);
  }

  public showKeyword = (keyword) => {
    return !!keyword;
  };

  public compareWith = (o1, o2) => {
    return o1.firstName === o2.firstName && o1.lastName === o2.lastName;
  };

  public validateText = (keyword) => {
    return email(keyword);
  };

  public selectAllClick() {
    this.autocomplete.selectAll();
  }

  public chipsSuffixClick(event) {
    console.log('chipsSuffixClick clicked', event);
  }

  public groupBy = (item) => {
    return item.gender;  
  };

  public openDialog() {
    this._dialog.open(DialogComponent);
  }

  public fetch = (keyword) => {
    console.log('Fetch', keyword);

    return this._exampleService
      .fetch(keyword, 10)
      .pipe(
        delay(70),
        map((items) => this.mapData(items)),
      );
  };

  public modelChange(e) {
    console.log('Model Change', e);
  }

  public staticClick() {
    this._message.success('Add New Account Clicked');
  }

  public suffixClick(event: UIEvent, data: any) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log('Suffix Click', data);
    this.autocomplete.closePanel();

    this.activeFirstName = data.firstName;
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  public mapData(data) {
    return data.map((item) => {
      return {
        ...item,
        background: '#569CD6',
        color: '#fff',
      };
    });
  }

}
