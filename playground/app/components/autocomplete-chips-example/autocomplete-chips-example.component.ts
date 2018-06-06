import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { filter, list, remove } from '@firestitch/common/array';


interface User {
  value: number;
  name: string;
  email: string;
}


@Component({
  selector: 'autocomplete-chips-example',
  templateUrl: 'autocomplete-chips-example.component.html',
  styleUrls: [ 'autocomplete-chips-example.component.scss' ]
})
export class AutocompleteChipsExampleComponent implements OnInit, OnDestroy {

  @ViewChild('input') input;
  @ViewChild('userAutocompleteInput') userAutocompleteInput;

  public user: User;
  public selectedUsers: User[] = [];
  public loadUsers$: BehaviorSubject<string> = new BehaviorSubject(null);

  private _list: User[] = [
    { name: 'Bob', value: 1, email: 'bob@gmail.com' },
    { name: 'Ryan', value: 2, email: 'ryan@gmail.com' },
    { name: 'Jane', value: 3, email: 'jane@gmail.com' },
    { name: 'Dave', value: 4, email: 'dave@gmail.com' }
  ];

  public filteredOptions: User[];

  constructor() { }

  ngOnInit() {

    this.loadUsers$
      .map((name) => name ? this.filter(name) : this._list.slice())
      .map(data => {
        const selectedUsersIds: number[] = (<number[]>list(this.selectedUsers, 'value'));
        return filter(data, (user) => {
          return selectedUsersIds.indexOf(user.value) === -1;
        });
      })
      .subscribe((data: User[]) => {
        this.filteredOptions = data;
      });

    // this.input.update
    //   .subscribe((data) => {
    //     if (!data) {
    //       return;
    //     }
    //     this.loadUsers$.next(data && typeof data === 'object' ? data.name : data);
    //   });
  }

  public inputChanged(data) {
    if (!data) {
      return;
    }
    this.loadUsers$.next(data && typeof data === 'object' ? data.name : data);
  }

  public filter(name: string) {
    return this._list.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  public addUser($event): void {
    this.selectedUsers.push($event.option.value);
    this.loadUsers$.next(null);
    this.input.nativeElement.value = '';
  }

  public removeUser(user): void {
    remove(this.selectedUsers, { value: user.value });
    this.loadUsers$.next(null);
  }

  public displayFn(data): string {
    return data ? data.name : data;
  }

  /**
   * TODO
   * Created for removing Material bug
   * Which doent's allow to open dropdown after removing the last element
   * Or choosing new element
   */
  public clickOnInput(event) {
    this.input.nativeElement.blur();
    this.input.nativeElement.focus();
  }

  ngOnDestroy() {
    this.loadUsers$.unsubscribe();
  }
}
