import { Component, OnInit } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ExampleService } from 'playground/app/services/example.service';



@Component({
  selector: 'autocomplete-chips-orderable-example',
  templateUrl: './autocomplete-chips-orderable-example.component.html'
})
export class AutocompleteChipsOrderableExampleComponent implements OnInit {


  public model = [];

  constructor(private exampleService: ExampleService) { }

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.exampleService.fetch(keyword);
  }
}
