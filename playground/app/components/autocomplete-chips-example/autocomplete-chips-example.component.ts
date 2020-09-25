import { isEqual } from 'lodash-es';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { email } from '@firestitch/common';
import { ExampleService } from 'playground/app/services/example.service';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'autocomplete-chips-example',
  styleUrls: ['autocomplete-chips-example.component.scss'],
  templateUrl: './autocomplete-chips-example.component.html'
})
export class AutocompleteChipsExampleComponent implements OnInit {

  public model = null;

  public config: any = {
    disabled: false,
    multiple: true,
    fetchOnFocus: true,
    removable: true,
    image: true,
    color: true,
    orderable: true,
    size: 'large',
  }

  constructor(private exampleService: ExampleService,
              private _message: FsMessage) { }

  ngOnInit() {

  }

  public compareWith = (o1, o2) => {
    return isEqual(o1, o2);
  };

  public validateText = keyword => {
    return email(keyword);
  };

  public fetch = (keyword) => {
    return this.exampleService.fetch(keyword, 10, this.config.multiple)
      .pipe(
        map(items => {
          return items.map(item => {
            return Object.assign(item, { background: '#569CD6', color: '#fff' });
          });
        })
      );
  };

  public modelChange(e) {
    console.log(e);
  }

  public staticClick(event) {
    this._message.success('Add New Account Clicked');
  }

  public click(data) {
    console.log(data);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
