import { isEqual } from 'lodash-es';
import { delay, map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { email } from '@firestitch/common';
import { ExampleService } from 'playground/app/services/example.service';
import { FsMessage } from '@firestitch/message';
import { FsAutocompleteChipsComponent } from './../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';



@Component({
  selector: 'autocomplete-chips-example',
  styleUrls: ['autocomplete-chips-example.component.scss'],
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
    size: 'large',
  }

  constructor(
    private exampleService: ExampleService,
    private _message: FsMessage,
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.model = [{ firstName: 'Jessey', lastName: 'Wing', gender: 'men', icon: 'settings' }];
    }, 1000)
  }

  public compareWith = (o1, o2) => {
    return isEqual(o1, o2);
  };

  public validateText = keyword => {
    return email(keyword);
  };

  public fetch = (keyword) => {
    console.log('Fetch', keyword);
    keyword = null;
    return this.exampleService.fetch(keyword, 10, this.config.multiple)
      .pipe(
        delay(100),
        map(items => {
          return items.map(item => {
            return Object.assign(item, { background: '#569CD6', color: '#fff' });
          });
        })
      );
  };

  public modelChange(e) {
    console.log('Model Change', e);
  }

  public staticClick(event) {
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

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
