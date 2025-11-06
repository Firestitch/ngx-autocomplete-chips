import { Component, OnInit, inject } from '@angular/core';
import { ExampleService } from 'playground/app/services/example.service';
import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'label-example',
    templateUrl: './label-example.component.html',
    standalone: true,
    imports: [FsAutocompleteChipsComponent, FormsModule, FsFormModule, JsonPipe]
})
export class LabelExampleComponent implements OnInit {
  private exampleService = inject(ExampleService);


  public model = [];

  ngOnInit() {
  }

  public fetch = keyword => {
    return this.exampleService.fetch(keyword);
  }
}
