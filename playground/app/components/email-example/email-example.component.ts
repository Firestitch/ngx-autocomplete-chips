import { ChangeDetectionStrategy, Component } from '@angular/core';

import { email } from '@firestitch/common';

import { of } from 'rxjs';


@Component({
  selector: 'email-example',
  templateUrl: './email-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailExampleComponent {

  public model = ['bob@email.com'];

  public validateText = (e) => {
    return email(e);
  };

  public fetch = (e) => {
    return of(['bob@email.com', 'john@email.com']); 
  };
}
