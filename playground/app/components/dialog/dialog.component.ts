import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';


import { map } from 'rxjs/operators';

import { ExampleService } from 'playground/app/services/example.service';


@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,

    MatDialogModule,
    MatButtonModule,

    FsDialogModule,
    FsFormModule,

    FsAutocompleteChipsModule,
  ],
})
export class DialogComponent {

  public model;

  private _exampleService = inject(ExampleService);

  
  public fetch = (keyword) => {
    console.log('Fetch', keyword);

    return this._exampleService.fetch(keyword, 10, true)
      .pipe(
        map((items) => items),
      );
  };
}
