import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { email } from '@firestitch/common';
import { FsMessage } from '@firestitch/message';

import { delay, map } from 'rxjs/operators';

import { ExampleService } from 'playground/app/services/example.service';

import { DialogComponent } from '../dialog';

import { FsAutocompleteChipsComponent } from './../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';


@Component({
  selector: 'autocomplete-chips-example',
  styleUrls: ['./autocomplete-chips-example.component.scss'],
  templateUrl: './autocomplete-chips-example.component.html',
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

  public selectAllClick(event) {
    this.autocomplete.selectAll();
  }

  public chipsSuffixClick(event: UIEvent) {
    event.stopImmediatePropagation();
    console.log('chipsSuffixClick clicked');
  }

  public groupBy = (item) => {
    return item.gender;  
  };

  public openDialog() {
    this._dialog.open(DialogComponent);
  }

  public fetch = (keyword) => {
    console.log('Fetch', keyword);

    return this._exampleService.fetch(keyword, 10, this.config.multiple)
      .pipe(
        delay(100),
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
