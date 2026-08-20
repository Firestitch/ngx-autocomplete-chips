import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { guid } from '@firestitch/common';

import { Observable, of } from 'rxjs';

import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';

import { StatusData } from './status-response.data';


@Component({
  selector: 'status-example',
  templateUrl: './status-example.component.html',
  styleUrls: ['./status-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
  ],
})
export class StatusExampleComponent implements OnInit {

  public guid = guid();
  public status: any;
  public tags: any[] = [];

  private _cdRef = inject(ChangeDetectorRef);
  private _exampleService = inject(ExampleService);

  public ngOnInit(): void {
    this._fetchStatuses()
      .subscribe((statuses) => {
        this.status = statuses[0];
        this._cdRef.markForCheck();
      });

    this.tags = this._exampleService.tags.slice(0, 2);
  }

  public fetchStatus = () => {
    return this._fetchStatuses();
  };

  public fetchTags = (keyword) => {
    return this._exampleService.fetchTags(keyword);
  };

  public compareWith(o1, o2): boolean {
    return o1 && o2 && o1.id === o2.id;
  }

  public changeStatus(status: any): void {
    console.log('changeStatus', status);
  }

  private _fetchStatuses(): Observable<any[]> {
    return of(StatusData);
  }

}
