import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog';


@Component({
  selector: 'dialog-example',
  templateUrl: './dialog-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButton,
    JsonPipe,
  ],
})
export class DialogExampleComponent {

  public result: any;

  private _cdRef = inject(ChangeDetectorRef);
  private _dialog = inject(MatDialog);

  /**
   * Inside a dialog the panel has to track the dialog's own resize, which the
   * component handles by re-measuring the panel a few times after it opens.
   */
  public open(): void {
    this._dialog.open(DialogComponent, { width: '500px' })
      .afterClosed()
      .subscribe((result) => {
        this.result = result;
        this._cdRef.markForCheck();
      });
  }

}
