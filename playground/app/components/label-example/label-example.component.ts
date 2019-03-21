import { Component, OnInit } from '@angular/core';
import { ExampleService } from 'playground/app/services/example.service';


@Component({
  selector: 'label-example',
  templateUrl: './label-example.component.html'
})
export class LabelExampleComponent implements OnInit {

  public model = [];

  constructor(private exampleService: ExampleService) { }

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.exampleService.fetch(keyword);
  }
}
