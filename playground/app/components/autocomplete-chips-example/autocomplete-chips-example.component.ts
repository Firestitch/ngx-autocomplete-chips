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
    return this.exampleService.fetch(keyword, existing);
  };

  public modelChange(e) {
    console.log(e);
  }

  public staticClick(event) {
    this._message.success('Add New Account Clicked');
  }
}
