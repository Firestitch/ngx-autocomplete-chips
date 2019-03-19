import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { FsApi } from '@firestitch/api';
import { email } from '@firestitch/common';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
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
