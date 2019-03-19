import { Component, OnInit } from '@angular/core';
import { email } from '@firestitch/common';
import { ExampleService } from 'playground/app/services/example.service';


@Component({
  selector: 'autocomplete-chips-example',
  templateUrl: './autocomplete-chips-example.component.html'
})
export class AutocompleteChipsExampleComponent implements OnInit {

  public model = [];
  public disabled = false;

  constructor(private exampleService: ExampleService) { }

  ngOnInit() {
  }

  public validateText = keyword => {
    return email(keyword);
 }

  public fetch = keyword => {
    return this.exampleService.fetch(keyword);
  }

  modelChange(e) {
    console.log(e);
  }
}
