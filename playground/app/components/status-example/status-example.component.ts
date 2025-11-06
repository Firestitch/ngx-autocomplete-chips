import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { guid } from '@firestitch/common';

import { Observable, of } from 'rxjs';

import { statusData } from './status-response.data';
import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';


@Component({
    selector: 'status-example',
    templateUrl: './status-example.component.html',
    styleUrls: ['./status-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsAutocompleteChipsComponent,
        FormsModule,
        FsFormModule,
        FsAutocompleteObjectDirective,
    ],
})
export class StatusExampleComponent implements OnInit {
  private _cdRef = inject(ChangeDetectorRef);


  public width = '120px';
  public status: any;
  public class = '';
  public initOnClick = true;
  public label = 'Status';
  public assignDefaultStatus = true;


  public guid = guid();

  public ngOnInit(): void {
    if (!this.status && this.assignDefaultStatus) {
      this._fetchStatuses()
        .subscribe((statuses) => {
          this.status = statuses[0];
          this.changeStatus(this.status);
          this._cdRef.markForCheck();
        });
    }
  }

  public changeStatus(status: any) {
    console.log('changeStatus', status);
  }

  public fetch = (keyword) => {
    return this._fetchStatuses();
  };

  public compareWith(o1, o2): boolean {
    return o1 && o2 && (o1.id === o2.id);
  }

  private _fetchStatuses(): Observable<any> {
    return of(statusData);
  }
}
