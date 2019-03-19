import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import {
  Component,
  ViewChild,
  ElementRef,
  TemplateRef,
  ContentChild,
  Input,
  OnInit,
  Provider, forwardRef, OnDestroy, OnChanges, HostListener, Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material'

import { isObject, isEqual, remove, findIndex, map, filter } from 'lodash-es';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { getObjectValue } from '../../helpers/get-object-value';
import { DataType } from 'src/app/interfaces/data-type';


export const FS_ACCOUNT_PICKER_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FsAutocompleteChipsComponent),
  multi: true
};


@Component({
  selector: 'fs-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: [ './autocomplete-chips.component.scss' ],
  providers: [FS_ACCOUNT_PICKER_ACCESSOR]
})
export class FsAutocompleteChipsComponent implements OnInit, OnDestroy {

  @Input() public fetch = null;
  @Input() public placeholder = '';
  @Input() public labelProperty = '';
  @Input() public imageProperty = 'image';
  @Input() public allowText: boolean;
  @Input() public allowObject = true;
  @Input() public delay = 300;
  @Input() public validateText;
  @Input() public invalidTextMessage = '';
  @Input() public disabled = false;
  @Input() public removable = true;
  @Input() public orderable = false;

  public separatorKeysCodes: number[] = [ENTER, COMMA, TAB];
  public searchData: any[] = [];
  public textData: object = {};
  public dataType = DataType;
  public keyword: string = null;
  public keyword$ = new Subject<Event>();

  private _model: any[] = [];
  private destroy$ = new Subject();

  get model() {
    return this._model;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(e) {
    e.preventDefault();
  };

  @ViewChild('searchInput') public searchInput: ElementRef = null;
  @ViewChild('autocompleteSearch') public autocompleteSearch = null;
  @ViewChild(MatAutocompleteTrigger) public autocompleteTrigger = null;


  private _onTouched = () => { };
  private _onChange = (value: any) => { };
  public onFocused = (event: any) => { };

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn }

  constructor() { }

  public ngOnInit() {
    this.keyword$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.delay)
      )
      .subscribe((e) => this.onKeyUp(e));

    if (this.allowText) {
      this.keyword$
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.textData = {};

          if (this._validateText(this.keyword)) {
            this.textData = { type: DataType.Text, data: this.keyword };
          }
        });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._model, event.previousIndex, event.currentIndex);
    this.writeValue(this._model);
  }

  private _validateText(text) {
    return String(text).trim().length && (!this.validateText || this.validateText(text));
  }

  public addText(text) {

    if (this._validateText(text)) {

      const textObject = { type: DataType.Text, data: text };

      this.writeValue([...this._model, textObject]);
    }
  }

  public addObject(object) {
    this.writeValue([...this._model, object]);
  }

  public blur() {

    if (this.allowText) {
      this.addText(this.keyword);
    }
    this.clearInput();
  }

  public onKeyUp(e) {

    if (!this.keyword) {
      this.searchData = [];
      return;
    }

    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      return;
    }

    if (this.allowText && e.code === 'Comma') {
      this.keyword.split(',').forEach(item => {
        this.addText(item.trim());
      });
      return this.clearInput();
    }

    this.fetch(this.keyword)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(response => {

        this.searchData = response.map(data => {
          return {
            type: DataType.Object,
            data: data,
            name: getObjectValue(data, this.labelProperty),
            image: getObjectValue(data, this.imageProperty)
          }
        });

        this.searchData = filter(this.searchData, item => {

          return findIndex(this._model, (model) => {
            return isEqual(model, item);
          }) === -1;

        });
      });
  }

  public onSelect(e: MatAutocompleteSelectedEvent) {
    this.searchData = [];
    const value = this.allowObject && this.allowText ? e.option.value : e.option.value.data;
    if (e.option.value.type === DataType.Object) {

      if (!filter(this._model, value).length) {
        this.addObject(e.option.value);
      }
    }

    if (e.option.value.type === DataType.Text) {

      if (!filter(this._model, value).length) {
        this.addText(e.option.value.data);
      }
    }

    this.clearInput();
  }

  public clearInput() {
    this.searchInput.nativeElement.value = '';
    this.keyword = '';
  }

  public onRemove(data): void {
    remove(this._model, data);
    this.writeValue(this._model, true);
  }

  public writeValue(value: any, allowEmpty = false): void {
    value = Array.isArray(value) ? value : [];

    if (!allowEmpty && !value.length) {
      return;
    }

    this._model = value;

    const model = map(this._model, (item) => {
      if (!this.allowText || !this.allowObject) {
        return item.data;
      }

      return item;
    });

    this._onChange(model);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
