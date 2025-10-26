import { Component, OnInit } from '@angular/core';
import { ExampleService } from 'playground/app/services/example.service';
import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { JsonPipe } from '@angular/common';



@Component({
    selector: 'text-example',
    templateUrl: './text-example.component.html',
    standalone: true,
    imports: [FsAutocompleteChipsComponent, FormsModule, FsFormModule, JsonPipe]
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
