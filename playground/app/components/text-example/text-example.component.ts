import { Component, OnInit } from '@angular/core';
import { ExampleService } from 'playground/app/services/example.service';



@Component({
  selector: 'text-example',
  templateUrl: './text-example.component.html'
})
export class TextExampleComponent implements OnInit {


  public model = [];

  public validateText = (e) => {
    return true;
  }

  constructor(private exampleService: ExampleService) { }

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.exampleService.fetch(keyword);
  }
}
