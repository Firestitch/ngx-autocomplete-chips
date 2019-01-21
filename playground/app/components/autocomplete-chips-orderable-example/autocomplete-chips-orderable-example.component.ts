import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { FsApi } from '@firestitch/api';


@Component({
  selector: 'autocomplete-chips-orderable-example',
  templateUrl: './autocomplete-chips-orderable-example.component.html'
})
export class AutocompleteChipsOrderableExampleComponent implements OnInit {

  public list = [
    { name: 'Bob', value: 1 },
    { name: 'Ryan', value: 2 },
    { name: 'Jane', value: 3 },
    { name: 'Dave', value: 4 }
  ];

  public model = [];

  public disabled = false;

  constructor(private fsApi: FsApi) { }

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.fsApi.get('https://boilerplate.firestitch.com/api/dummy', { name: keyword })
      .pipe(
        map(response => response.data.objects),
        map(response => {
          for (let key in response) {
            response[key].id = +key + 1;
          }
          return response;
        })
      );
  }

  save(form) {
    console.log(form);
  }

  onSelected(data) {
    console.log(data);
  }

  onRemove(data) {
    console.log(data);
  }

  onDrop(data) {
    console.log(data);
  }
}
