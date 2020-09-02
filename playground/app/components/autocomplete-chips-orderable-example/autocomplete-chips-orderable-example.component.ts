import { Component, OnInit } from '@angular/core';
import { ExampleService } from 'playground/app/services/example.service';



@Component({
  selector: 'autocomplete-chips-orderable-example',
  templateUrl: './autocomplete-chips-orderable-example.component.html'
})
export class AutocompleteChipsOrderableExampleComponent implements OnInit {

  public model = [];

  constructor(private exampleService: ExampleService) { }

  ngOnInit() {
    this.exampleService.fetch('', 3)
    .subscribe(response => {
      this.model = response;
    });
  }

  public fetch = (keyword, existing) => {
    return this.exampleService.fetch(keyword, existing);
  }
}
