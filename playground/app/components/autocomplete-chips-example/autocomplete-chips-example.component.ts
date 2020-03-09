import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { email } from '@firestitch/common';
import { ExampleService } from 'playground/app/services/example.service';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'autocomplete-chips-example',
  templateUrl: './autocomplete-chips-example.component.html'
})
export class AutocompleteChipsExampleComponent implements OnInit {

  public model = [];
  public disabled = false;

  constructor(private exampleService: ExampleService,
              private _message: FsMessage) { }

  ngOnInit() {}

  public validateText = keyword => {
    return email(keyword);
  };

  public fetch = (keyword, existing) => {
    return this.exampleService.fetch(keyword, existing)
    .pipe(
      map(items => {
        return items.map(item => {
          return Object.assign(item, { background: '#569CD6', color: '#fff' });
        });
      })
    )
  };

  public modelChange(e) {
    console.log(e);
  }

  public staticClick(event) {
    this._message.success('Add New Account Clicked');
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
