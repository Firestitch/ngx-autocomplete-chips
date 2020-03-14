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

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

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
  @Input() public color = '#000000de';
  @Input() public background = '#e0e0e0';
  @Input() public orderable = false;
  @Input() public limit = 0;
  @Input() public fetchOnFocus = true;
  @Input()
  public compareWith = (o1: any, o2: any) => {
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

  @HostBinding('class.fs-form-wrapper') formWrapper = true;

  public searchData: any[] = [];
  public textData: any = {};
  public disabled = false;
  public dataType = DataType;
  public keyword: string = null;
  public keyword$ = new Subject<Event>();
  public noResults = false;
  public name;

  public _model: any[] = [];
  private destroy$ = new Subject();

  get model() {
    return this._model;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(e) {
    e.preventDefault();
  };

  @HostListener('click', [])
  showSearchInput() {
    if (this.model.length > 0) {
      setTimeout(() => {
        this.focus();
      });
    }
  }

  @ContentChild(FsAutocompleteObjectDirective, { read: TemplateRef, static: true })
  objectTemplate: FsAutocompleteObjectDirective = null;

  @ViewChild('searchInput', { static: false }) public searchInput: ElementRef = null;
  @ViewChild('autocompleteSearch', { static: true }) public autocompleteSearch: MatAutocomplete = null;
  @ViewChild(MatAutocompleteTrigger, { static: true }) public autocompleteTrigger = null;
  @ViewChild('formField', { read: ElementRef, static: true }) public formField: ElementRef = null

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

    this.keyword$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.delay)
      )
      .subscribe((e) => {
        this.keyword = trim(this.searchInput.nativeElement.value);

        if (this.allowObject) {
          this.objectKeyword(e);
        }

        if (this.allowText) {
          this.textKeyword(e);
        }
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._model, event.previousIndex, event.currentIndex);
    this.reordered.emit({
      item: event.item.data.data,
      from: event.previousIndex,
      to: event.currentIndex,
      items: this._model,
    });
    this.updateModel(this._model);
  }

  private _validateText(text) {
    return String(text).trim().length && (!this.validateText || this.validateText(text));
  }

  public addText(text) {

    if (this._validateText(text)) {

      const textObject = this.createItem(text, DataType.Text);
      this.updateModel([...this._model, textObject]);
      this.focus();
    }
  }

  public focus() {
    this.searchInput.nativeElement.focus();
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

    this.clearInput();
  }

  public textKeyword(e) {

    if (this.allowText && e.code === 'Comma') {
      this.keyword.split(',').forEach(item => {
        this.addText(item.trim());
      });
      return this.clearInput();
    }

    this.textData = {};

    if (this._validateText(this.keyword)) {
      this.textData = this.createItem(this.keyword, DataType.Text);
    }

    this._cdRef.detectChanges();
  }

  public focused(e) {

    if (!this.fetchOnFocus) {
      this.searchData = [];
    }

    if (this.fetchOnFocus) {
      this.objectKeyword(e);
      this.autocompleteTrigger.openPanel();
    }
  }

  public objectKeyword(e) {

    if (e && (['Enter', 'ArrowDown', 'ArrowUp'].indexOf(e.code) > -1 || (this.allowText && e.code === 'Comma'))) {
      return;
    }

    if (!this.fetchOnFocus && !this.keyword) {
      this.searchData = [];
      return;
    }

    if (this.fetch) {
      this.noResults = false;
      this.fetch(this.keyword, this.model)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(response => {

          this.searchData = response.map(data => {
            return this.createItem(data, DataType.Object);
          });

          this.searchData = filter(this.searchData, item => {
            return findIndex(this._model, (model) => {
              return this.compareWith(model.data, item.data);
            }) === -1;
          });

          if (!this.searchData.length) {
            this.noResults = true;
          }

          this._cdRef.detectChanges();
        });
    }
  }

  private createItem(data, type) {
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

  public onSelect(e: MatAutocompleteSelectedEvent) {

    if (!e.option.value) {
      return;
    }

    this.searchData = [];
    this.clearInput();

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

  public clearInput() {
    this.searchInput.nativeElement.value = '';
    this.textData = {};
    this.keyword = '';
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
      return this.createItem(item, type);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
