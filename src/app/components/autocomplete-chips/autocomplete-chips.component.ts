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
  ViewChildren,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { filter, isEqual, isObject, map, remove, trim, random } from 'lodash-es';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Subject, of, timer } from 'rxjs';
import { takeUntil, switchMap, tap, takeWhile, debounce } from 'rxjs/operators';

import { getObjectValue } from '../../helpers/get-object-value';
import { DataType } from '../../interfaces/data-type';
import { FsAutocompleteObjectDirective } from '../../directives/autocomplete-object/autocomplete-object.directive';
import { FsAutocompleteChipsNoResultsDirective } from '../../directives/autocomplete-no-results/autocomplete-no-results.directive';
import { FsAutocompleteChipsStaticDirective } from './../../directives/static-template/static-template.directive';
import { FsAutocompleteChipSuffixDirective } from './../../directives/chip-suffix/chip-suffix.directive';


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
  public noResultsTemplate: TemplateRef<FsAutocompleteChipsNoResultsDirective> = null;

  @ContentChildren(FsAutocompleteChipsStaticDirective, { read: TemplateRef })
  public staticTemplates: TemplateRef<FsAutocompleteChipsStaticDirective>[] = null;

  @ContentChildren(FsAutocompleteChipsStaticDirective)
  public staticDirectives: QueryList<FsAutocompleteChipsStaticDirective>;

  @Input() public fetch = null;
  @Input() public readonly = false;
  @Input() public size: 'large' | 'small' = 'large';
  @Input() public placeholder = '';
  @Input() public chipImage = 'image';
  @Input() public chipBackground;
  @Input() public chipColor;
  @Input() public chipIcon;
  @Input() public chipIconColor;
  @Input() public chipClass;
  @Input() public allowText: boolean;
  @Input() public allowObject = true;
  @Input() public delay = 200;
  @Input() public validateText;
  @Input() public invalidTextMessage = '';
  @Input() public removable = true;
  @Input() public allowClear = true;
  @Input() public color = '';
  @Input() public background = '';
  @Input() public orderable = false;
  @Input() public limit = 0;
  @Input() public initOnClick = false;
  @Input() public fetchOnFocus = true;
  @Input() public multiple = true;
  @Input() public set panelClass(value) {
    this.panelClasses = [
      ...['fs-account-picker-autocomplete', 'fs-autocomplete-chips-panel'],
      value,
    ].join(' ');
  };

  @Input() public compareWith = (o1: any, o2: any) => {
    return isEqual(o1, o2);
  };

  @Input('disabled') set setDisabled(value) {
    this.disabled = value;
    if (this.formField) {
      setTimeout(() => {
        if (value) {
          this.formField.nativeElement.classList.add('mat-form-field-disabled');
        } else {
          this.formField.nativeElement.classList.remove('mat-form-field-disabled');
        }
      });
    }
  }

  @Output() public selected = new EventEmitter();
  @Output() public removed = new EventEmitter();
  @Output() public reordered = new EventEmitter();
  @Output('clear') public clearEvent = new EventEmitter();

  @HostBinding('class.fs-form-wrapper')
  public formWrapper = true;

  @HostListener('dragstart', ['$event'])
  public dragStart(e) {
    e.preventDefault();
  };

  @ContentChild(FsAutocompleteObjectDirective, { read: TemplateRef })
  public objectTemplate: FsAutocompleteObjectDirective = null;

  @ContentChild(FsAutocompleteChipSuffixDirective, { read: TemplateRef })
  public suffixTemplate: FsAutocompleteChipSuffixDirective = null;

  @ViewChild('input')
  public input: ElementRef = null;

  @ViewChildren(MatAutocompleteTrigger)
  public autocompleteTriggers: QueryList<MatAutocompleteTrigger>;

  @ViewChild(MatAutocompleteTrigger)
  public autocompleteTrigger = null;

  @ViewChild(MatFormField, { read: ElementRef })
  public formField: ElementRef = null

  public data: any[];
  public textData: any = {};
  public disabled = false;
  public dataType = DataType;
  public keyword: string = null;
  public noResults = false;
  public name;
  public _model: any[] = [];
  public inited = false;
  public panelClasses;

  public get model() {
    return this._model;
  }

  public get inputEl() {
    return this.input ? this.input.nativeElement : null;
  }

  private _keyword$ = new Subject<KeyboardEvent>();
  private _fetch$ = new Subject<string>();
  private _destroy$ = new Subject();
  private _onTouched = () => { };
  private _onChange = (value: any) => { };

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
    this.name = 'autocomplete_'.concat(random(1, 9999999));
    this.panelClass = '';
  }

  public ngOnInit() {
    this.inited = !this.initOnClick;
    this._keyword$
      .pipe(
        takeUntil(this._destroy$),
        takeWhile(() => this.inited),
        tap(() => {
          this.data = null;
          this.keyword = this.inputEl ? trim(this.inputEl.value) : '';
        }),
        debounce(() => {
          let delay = 0;
          if (this.keyword.length && this.allowObject) {
            delay = this.delay;
          }

          return timer(delay);
        })
      )
      .subscribe(() => {
          this._fetch$.next(this.keyword);
        });

    this._fetch$
      .pipe(
        takeUntil(this._destroy$),
        takeWhile(() => this.inited),
        switchMap((keyword) => {
          let observable = of([]);

          if (this.allowText) {
            this.textData = {};
            if (this._validateText(keyword)) {
              this.textData = this._createItem(keyword, DataType.Text);
            }
          }

          if (this.allowObject) {
            this.noResults = false;
            observable = this.fetch(keyword)
              .pipe(
                tap((response: any) => {

                  this.data = response.map(data => {
                    return this._createItem(data, DataType.Object);
                  });

                  if (this.multiple) {
                    this.data = this.data.filter((item) => {
                      return !this.model.some((model) => {
                        return this.compareWith(model.data, item.data);
                      });
                    });
                  } else {
                    const selected = this.data.find((item) => {
                      return this.model.some((model) => {
                        return this.compareWith(model.data, item.data);
                      });
                    });

                    if (selected) {
                      selected.selected = true;
                    }
                  }

                  this.noResults = !this.data.length;
                }),
                takeUntil(this._destroy$),
              );
          }

          return observable;
        }),
      )
      .subscribe((e) => {
        this._cdRef.markForCheck();
      });
  }

  public init(): void {
    if (!this.disabled) {
      this.inited = true;
      this._cdRef.markForCheck();
      setTimeout(() => {
        this.focus();
      }, 200); // Hack: Delay to wait for animation to finish
    }
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this._model, event.previousIndex, event.currentIndex);
    this.reordered.emit({
      item: event.item.data.data,
      from: event.previousIndex,
      to: event.currentIndex,
      items: this._model,
    });
    this._updateModel(this._model);
  }

  public inputed(event) {

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
      if (activeOption && activeOption.value.type === DataType.Object) {
        this._addObject(activeOption.value);
        this.selected.emit(activeOption.value);
      }
    }

    this._clearData();
  }

  public focus() {
    this.inputEl.focus();
  }

  public clearClick(event: KeyboardEvent) {
    event.stopPropagation();
    this.clear(true);
    this.clearEvent.emit();
  }

  public clear(closePanel = true) {
    if (closePanel) {
      this.closePanel();
    }

    this._clearInput();
    this.noResults = false;
    this._updateModel([]);
  }

  public closePanel() {
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel();
    }
  }

  public closed() {
    this._close();
    if (this.initOnClick) {
       // Wait for keyDown() to fire to process
      setTimeout(() => {
        this.inited = false;
        this._cdRef.markForCheck();
      });
    }
    this._clearData();
  }

  public focused(e) {
    this._clearInput();
    if (this.fetchOnFocus) {
      this._fetch();
      this.autocompleteTrigger.openPanel();
    }
  }

  public optionClick(event: UIEvent, value: any, refocus = false): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.multiple) {
      this._select(value);

      if (refocus) {
        this.focus();
      } else {
        this.closePanel();
      }
    } else {
      this._select(value, { fetch: false});
      this._close();
      this.closePanel();
    }
  }

  public optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      return;
    }

    this._select(event.option.value);
    this._clearData();
    this._clearInput();
  }

  private _select(selected, options: { fetch?: boolean } = {}): void {
    if (!this.multiple) {
      this._model = [];
    }

    const index = this.data.indexOf(selected);
    if (index !== -1) {
      this.data.splice(index, 1)
    }

    const value = this.allowObject && this.allowText ? selected : selected.data;
    if (selected.type === DataType.Object) {

      if (!filter(this._model, value).length) {
        this._addObject(selected);
        this.selected.emit(selected);
      }
    }

    if (selected.type === DataType.Text) {
      if (!filter(this._model, value).length) {
        this._addText(selected.data);
        this.selected.emit(selected.data);
      }
    }

    if (options.fetch !== false) {
      this._fetch();

      setTimeout(() => {
        if (this.autocompleteTrigger) {
          this.autocompleteTrigger.updatePosition();
        }
      });
    }
  }

  public chipRemoved(event: UIEvent, item): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    remove(this.model, item);
    this._updateModel(this._model);
    this.removed.emit(item);
    this.init();
    this._fetch();
  }

  public writeValue(value: any): void {

    if (value) {
      value = Array.isArray(value) ? value : [value];

      value = map(value, (item) => {
        const type = isObject(item) ? DataType.Object : DataType.Text;
        return this._createItem(item, type);
      });
    } else {
      value = [];
    }

    this._model = value;
    this._cdRef.markForCheck();
  }

  public staticClick(event: KeyboardEvent, index) {
    event.stopPropagation();
    event.preventDefault();
    const staticDirective: FsAutocompleteChipsStaticDirective = this.staticDirectives.toArray()[index];
    staticDirective.click.emit(event);
    if (this.inputEl) {
      this.inputEl.blur();
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _clearData(): void {
    this.data = null;
  }

  private _clearInput() {
    if (this.inputEl) {
      this.inputEl.value = '';
    }

    this.textData = {};
    this.keyword = '';
  }

  private _createItem(data, type) {
    const item: any = {
        type: type,
        data: data
      };

    if (type === DataType.Object) {
      item.image = getObjectValue(data, this.chipImage);
      item.icon = getObjectValue(data, this.chipIcon);
      item.iconColor = getObjectValue(data, this.chipIconColor) || this.chipIconColor;
      item.class = getObjectValue(data, this.chipClass) || this.chipClass;
      item.background = getObjectValue(data, this.chipBackground) || this.chipBackground;
      item.color = getObjectValue(data, this.chipColor) || this.chipColor;
    }

    return item;
  }

  private _validateText(text) {
    return String(text).trim().length && (!this.validateText || this.validateText(text));
  }

  private _updateModel(value) {

    this._model = value;

    const model = map(this._model, (item) => {
      if (!this.allowText || !this.allowObject) {
        return item.data;
      }

      return item;
    });

    this._onChange(this.multiple ? model : model[0]);
    this._onTouched();
  }

  private _addObject(object) {
    this._updateModel([...this._model, object]);
  }

  private _addText(text) {
    if (this._validateText(text)) {
      const textObject = this._createItem(text, DataType.Text);
      this._updateModel([...this._model, textObject]);
      this.focus();
    }
  }

  private _close(): void {
    if (this.allowText) {
      this._addText(this.keyword);
    }

    this._clearInput();
  }

  private _fetch(): void {
    this._fetch$.next(null);
  }

}
