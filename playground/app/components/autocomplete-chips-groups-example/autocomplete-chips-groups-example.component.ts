import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { FsApi } from '@firestitch/api';
import { sort } from '@firestitch/common/array';


@Component({
  selector: 'autocomplete-chips-groups-example',
  templateUrl: './autocomplete-chips-groups-example.component.html'
})
export class AutocompleteChipsGroupsExampleComponent implements OnInit {

  public list = [
    { name: 'Bob', value: 1 },
    { name: 'Ryan', value: 2 },
    { name: 'Jane', value: 3 },
    { name: 'Dave', value: 4 }
  ];

  public model = [];

  public createdItems = [];

  public disabled = false;

  @ViewChild('autocompleteChips') public autocompleteChips = null;

  constructor(private fsApi: FsApi) { }

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.fsApi.get('https://boilerplate.firestitch.com/api/dummy', { name: keyword })
    .map(response => response.data.objects)
    .map(response => sort([...response, ...this.createdItems], 'name'))
    .map(response => {

      for (let key in response) {
        response[key].id = +key + 1;
      }

      const result = [{ name: 'Objects', data: response }];

      if (keyword) {
        result.push({
          name: 'Create new object',
          data: [
            { id: null, name: keyword }
          ]
        });
      }

      return result;
    });
  }

  save(form) {
    console.log(form);
  }

  onSelected(data) {
    console.log(data);
    if (!data.id) {
      this.createdItems.push(data);
      this.autocompleteChips.keywordChange();
    }
  }

  onRemove(data) {
    console.log(data);
  }
}
