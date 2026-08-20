import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButton } from '@angular/material/button';

import { FsMessage } from '@firestitch/message';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';


@Component({
  selector: 'reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatButton,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
  ],
})
export class ReactiveFormExampleComponent {

  public form: FormGroup;

  private _exampleService = inject(ExampleService);
  private _message = inject(FsMessage);

  constructor() {
    this.form = inject(FormBuilder).group({
      owner: [null, Validators.required],
      watchers: [[], Validators.required],
    });
  }

  public get owner() {
    return this.form.get('owner');
  }

  public get watchers() {
    return this.form.get('watchers');
  }

  public fetch = (keyword) => {
    return this._exampleService.fetch(keyword, 10);
  };

  public compareWith = (o1, o2) => {
    return o1?.id === o2?.id;
  };

  public submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this._message.error('Both fields are required');

      return;
    }

    this._message.success('Submitted');
  }

  public patch(): void {
    const [owner, ...watchers] = this._exampleService.people.slice(0, 4);

    this.form.patchValue({ owner, watchers });
  }

  public toggleDisabled(): void {
    if (this.form.disabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  public reset(): void {
    this.form.reset({ owner: null, watchers: [] });
  }

}
