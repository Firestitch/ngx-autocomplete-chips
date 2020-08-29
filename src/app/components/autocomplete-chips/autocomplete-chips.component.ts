import { FsAutocompleteChipsNoResultsDirective } from '../../directives/autocomplete-no-results/autocomplete-no-results.directive';
import { FsAutocompleteChipsStaticDirective } from './../../directives/static-template/static-template.directive';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { filter, findIndex, isEqual, isObject, map, remove, trim, random } from 'lodash-es';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Subject, of } from 'rxjs';
import { debounceTime, takeUntil, switchMap, tap } from 'rxjs/operators';

import { getObjectValue } from '../../helpers/get-object-value';
import { DataType } from '../../interfaces/data-type';
import { FsAutocompleteObjectDirective } from '../../directives/autocomplete-object/autocomplete-object.directive';


@Component({
  selector: 'fs-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: [ './autocomplete-chips.component.scss' ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsAutocompleteChipsComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAutocompleteChipsComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @ContentChild(FsAutocompleteChipsNoResultsDirective, { read: TemplateRef, static: true })
  public noResultsTemplate: TemplateRef<FsAutocompleteChipsNoResultsDirective>[] = null;

  @ContentChildren(FsAutocompleteChipsStaticDirective, { read: TemplateRef })
  public staticTemplates: TemplateRef<FsAutocompleteChipsStaticDirective>[] = null;

  @ContentChildren(FsAutocompleteChipsStaticDirective)
  public staticDirectives: QueryList<FsAutocompleteChipsStaticDirective>;

  @Input() public fetch = null;
  @Input() public readonly = false;
  @Input() public placeholder = '';
  @Input() public imageProperty = '';
  @Input() public backgroundProperty = '';
  @Input() public colorProperty = '';
  @Input() public allowText: boolean;
  @Input() public allowObject = true;
  @Input() public delay = 300;
  @Input() public validateText;
  @Input() public invalidTextMessage = '';
  @Input() public removable = true;
  @Input() public color = '';
  @Input() public background = '';
  @Input() public orderable = false;
  @Input() public limit = 0;
  @Input() public fetchOnFocus = true;
  @Input() public compareWith = (o1: any, o2: any) => {
    return isEqual(o1, o2);
  };

  @Input('disabled') set setDisabled(value) {
    this.disabled = value;
    setTimeout(() => {
      if (value) {
        this.formField.nativeElement.classList.add('mat-form-field-disabled');
      } else {
        this.formField.nativeElement.classList.remove('mat-form-field-disabled');
      }
    });
  }

  @Output() public selected = new EventEmitter();
  @Output() public removed = new EventEmitter();
  @Output() public reordered = new EventEmitter();

  @HostBinding('class.fs-form-wrapper')
  public formWrapper = true;

  @HostListener('dragstart', ['$event'])
  public dragStart(e) {
    e.preventDefault();
  };

  @HostListener('click', [])
  public showSearchInput() {
    if (this.model.length > 0) {
      setTimeout(() => {
        this.focus();
      });
    }
  }

  @ContentChild(FsAutocompleteObjectDirective, { read: TemplateRef, static: true })
  public objectTemplate: FsAutocompleteObjectDirective = null;

  @ViewChild('searchInput', { static: false })
  public searchInput: ElementRef = null;

  @ViewChild('autocompleteSearch', { static: true })
  public autocompleteSearch: MatAutocomplete = null;

  @ViewChild(MatAutocompleteTrigger, { static: true })
  public autocompleteTrigger = null;

  @ViewChild('formField', { read: ElementRef, static: true })
  public formField: ElementRef = null

  public data: any[] = [];
  public textData: any = {};
  public disabled = false;
  public dataType = DataType;
  public keyword: string = null;
  public noResults = false;
  public name;
  public searching = false;
  public _model: any[] = [];

  public get model() {
    return this._model;
  }

  private _keyword$ = new Subject<KeyboardEvent>();
  private _destroy$ = new Subject();
  private _onTouched = () => { };
  private _onChange = (value: any) => {};

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn }

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
    this.name = 'autocomplete_'.concat(random(1, 9999999));
  }

  public ngOnInit() {
    this._keyword$
      .pipe(
        debounceTime(this.delay),
        takeUntil(this._destroy$),
        switchMap((event: KeyboardEvent) => {
          let observable = of([]);
          this._clearData();
          this.searching = true;
          this.keyword = trim(this.searchInput.nativeElement.value);

          if (this.allowText && event) {
            if (event.code === 'Comma') {
              this.keyword.split(',').forEach(item => {
                this.addText(item.trim());
              });
              this.clear(false);
            } else {

              this.textData = {};
              if (this._validateText(this.keyword)) {
                this.textData = this._createItem(this.keyword, DataType.Text);
              }
            }
          }

          if (this.allowObject && (this.keyword.length || this.fetchOnFocus)) {
            this.noResults = false;
            observable = this.fetch(this.keyword, this.model)
              .pipe(
                tap((response: any) => {

                  this.data = response.map(data => {
                    return this._createItem(data, DataType.Object);
                  });

                  this.data = filter(this.data, item => {
                    return findIndex(this._model, (model) => {
                      return this.compareWith(model.data, item.data);
                    }) === -1;
                  });

                  this.noResults = !this.data.length;
                }),
                takeUntil(this._destroy$),
              );

          }

          return observable;
        }),
      )
      .subscribe((e) => {
        this.searching = false;
        this._cdRef.markForCheck();
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._model, event.previousIndex, event.currentIndex);
    this.reordered.emit({
      item: event.item.data.data,
      from: event.previousIndex,
      to: event.currentIndex,
      items: this._model,
    });
    this.updateModel(this._model);
  }

  public addText(text) {
    if (this._validateText(text)) {
      const textObject = this._createItem(text, DataType.Text);
      this.updateModel([...this._model, textObject]);
      this.focus();
    }
  }

  public input(event) {
    if (this.readonly || this.disabled) {
      return;
    }

    this._keyword$.next(event);
  }

  public keyDown(event: KeyboardEvent) {
    if (this.readonly || this.disabled) {
      return;
    }

    if (['Enter', 'ArrowDown', 'ArrowUp'].indexOf(event.code) !== -1) {
      return;
    } else if (event.code === 'Tab') {
      const activeOption = this.autocompleteTrigger.activeOption;
      if (activeOption && activeOption.type === DataType.Object) {
        this.addObject(activeOption.value);
        this.selected.emit(activeOption.value);
      }
    }

    this.searching = true;
    this._clearData();
  }

  public focus() {
    this.searchInput.nativeElement.focus();
  }

  public clearClick(event: KeyboardEvent) {
    event.stopPropagation();
    this.clear();
  }

  public clear(closePanel = true) {
    if (closePanel) {
      this.autocompleteTrigger.closePanel();
    }

    this._clearInput();
    this.noResults = false;
    this._model = [];
    this._onChange(this._model);
  }

  public addObject(object) {
    this.updateModel([...this._model, object]);
  }

  public blured() {

    if (this.autocompleteSearch.isOpen) {
      return;
    }

    this.closed();
  }

  public closed() {

    if (this.allowText) {
      this.addText(this.keyword);
    }

    this._clearInput();
  }

  public focused(e) {
    this._clearData();
    if (this.fetchOnFocus) {
      this.searching = true;
      this._keyword$.next(null);
      this.autocompleteTrigger.openPanel();
    } else {
      this.data = [];
    }
  }

  public optionSelected(e: MatAutocompleteSelectedEvent) {

    if (!e.option.value) {
      return;
    }

    this._clearData();
    this._clearInput();

    const value = this.allowObject && this.allowText ? e.option.value : e.option.value.data;
    if (e.option.value.type === DataType.Object) {

      if (!filter(this._model, value).length) {
        this.addObject(e.option.value);
        this.selected.emit(e.option.value);
      }
    }

    if (e.option.value.type === DataType.Text) {
      if (!filter(this._model, value).length) {
        this.addText(e.option.value.data);
        this.selected.emit(e.option.value.data);
      }
    }

    setTimeout(() => {
      this.focused(null);
    });
  }

  public onRemove(data): void {
    this.autocompleteTrigger.closePanel();
    remove(this._model, data);
    this.updateModel(this._model);
    this.removed.emit(data);
  }

  public writeValue(value: any): void {
    value = Array.isArray(value) ? value : [];

    value = map(value, (item) => {
      const type = isObject(item) ? DataType.Object : DataType.Text;
      return this._createItem(item, type);
    });

    this._model = value;
    this._cdRef.markForCheck();
  }

  public updateModel(value) {

    this._model = value;

    const model = map(this._model, (item) => {
      if (!this.allowText || !this.allowObject) {
        return item.data;
      }

      return item;
    });

    this._onChange(model);
    this._onTouched();
  }

  public staticClick(event: KeyboardEvent, index) {
    const staticDirective: FsAutocompleteChipsStaticDirective = this.staticDirectives.toArray()[index];
    staticDirective.click.emit(event);
    this.autocompleteTrigger.closePanel();
    this.searchInput.nativeElement.blur();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _clearData(): void {
    this.data = [];
  }

  private _clearInput() {
    this.searchInput.nativeElement.value = '';
    this.textData = {};
    this.keyword = '';
  }

  private _createItem(data, type) {
    const item: any = {
        type: type,
        data: data
      };

    if (type === DataType.Object) {
      item.image = getObjectValue(data, this.imageProperty);
      item.background = getObjectValue(data, this.backgroundProperty);
      item.color = getObjectValue(data, this.colorProperty);
    }

    return item;
  }

  private _validateText(text) {
    return String(text).trim().length && (!this.validateText || this.validateText(text));
  }

}
