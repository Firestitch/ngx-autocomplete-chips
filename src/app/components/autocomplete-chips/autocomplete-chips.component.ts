import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { KEY_BACKSPACE, KEY_DELETE } from '@firestitch/common';

import { Observable, Subject, of, timer } from 'rxjs';
import { debounce, delay, filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { isEqual, random } from 'lodash-es';

import { FsAutocompleteChipsNoResultsDirective } from '../../directives/autocomplete-chips-no-results.directive';
import { FsAutocompleteChipsSubtemplateDirective } from '../../directives/autocomplete-chips-subtemplate.directive';
import { FsAutocompleteChipsTemplateDirective } from '../../directives/autocomplete-chips-template.directive';
import { FsAutocompleteChipsSuffixDirective } from '../../directives/chips-suffix.directive';
import { FsAutocompleteChipSelectedSuffixDirective } from '../../directives/selected-chip-suffix.directive';
import { FsAutocompleteChipsStaticDirective } from '../../directives/static-template.directive';
import { FsAutocompleteChipsTextValidIndicatorDirective } from '../../directives/text-valid-indicator.directive';
import { getObjectValue } from '../../helpers/get-object-value';
import { IAutocompleteItem } from '../../interfaces/autocomplete-item';
import { DataType } from '../../interfaces/data-type';
import { AutoSizeInputDirective } from '../../modules/ngx-autosize-input/src';
import { ConfirmComponent } from '../confirm';


@Component({
  selector: 'fs-autocomplete-chips',
  templateUrl: './autocomplete-chips.component.html',
  styleUrls: ['./autocomplete-chips.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsAutocompleteChipsComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAutocompleteChipsComponent
implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild(AutoSizeInputDirective)
  public autoSizeInput: AutoSizeInputDirective;

  @ViewChild(MatInput, { read: ElementRef })
  public matInputEl: ElementRef;

  @ViewChild(MatAutocomplete)
  public autocomplete: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger)
  public autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild(MatFormField, { read: ElementRef })
  public formField: ElementRef = null;

  @ContentChild(FsAutocompleteChipsTemplateDirective, { read: TemplateRef })
  public objectTemplate: TemplateRef<FsAutocompleteChipsTemplateDirective> = null;

  @ContentChildren(FsAutocompleteChipSelectedSuffixDirective)
  public chipSelectedSuffixes: QueryList<FsAutocompleteChipSelectedSuffixDirective>;

  @ContentChild(FsAutocompleteChipsSuffixDirective, { read: TemplateRef })
  public chipsSuffixTemplate: TemplateRef<FsAutocompleteChipsSuffixDirective> = null;

  @ContentChild(FsAutocompleteChipsTextValidIndicatorDirective, { read: TemplateRef })
  public textValidIndicatorTemplate: TemplateRef<FsAutocompleteChipsTextValidIndicatorDirective>;

  @ContentChild(FsAutocompleteChipsNoResultsDirective, { read: TemplateRef, static: true })
  public noResultsTemplate: TemplateRef<FsAutocompleteChipsNoResultsDirective>;

  @ContentChildren(FsAutocompleteChipsStaticDirective)
  public staticDirectives: QueryList<FsAutocompleteChipsStaticDirective>;

  @ContentChild(FsAutocompleteChipsSubtemplateDirective, { read: TemplateRef })
  public objectSubtemplate: TemplateRef<FsAutocompleteChipsSubtemplateDirective> = null;

  @Input() public fetch = null;
  @Input() public appearance: MatFormFieldAppearance;
  @Input() public floatLabel: 'always' | 'auto';
  @Input() public readonly = false;
  @Input() public size: 'large' | 'small' = 'large';
  @Input() public label: string;
  @Input() public placeholder;
  @Input() public chipImage = 'image';
  @Input() public chipBackground: string;
  @Input() public chipColor: string;
  @Input() public chipIcon: string;
  @Input() public chipIconColor: string;
  @Input() public chipClass: string;
  @Input() public shape: 'round' | 'square' = 'round';
  @Input() public hint: string;
  @Input() public allowText: boolean;
  @Input() public allowObject = true;
  @Input() public delay = 200;
  @Input() public validateText: (text: string) => boolean;
  @Input() public removable = true;
  @Input() public allowClear = true;
  @Input() public color = '';
  @Input() public background = '';
  @Input() public orderable = false;
  @Input() public padless = false;
  @Input() public initOnClick = false;
  @Input() public fetchOnFocus = true;
  @Input() public multiple = true;
  @Input() public confirm = false;
  @Input() public disabled = false;
  @Input() public groupBy: (item: any) => string;
  @Input() public panelWidth: string | number;
  @Input() public set panelClass(value) {
    this.panelClasses = [
      ...['fs-account-picker-autocomplete', 'fs-autocomplete-chips-panel'],
      value,
    ];
  }

  @Input()
  public compareWith: (o1: any, o2: any) => boolean;

  @Output() public selected = new EventEmitter();
  @Output() public removed = new EventEmitter();
  @Output() public reordered = new EventEmitter();
  @Output('clear') public clearEvent = new EventEmitter();

  @HostBinding('class.fs-form-wrapper')
  public formWrapper = true;

  public data: IAutocompleteItem[];
  public textData: Partial<IAutocompleteItem> = {};
  public dataType = DataType;
  public keyword: string = null;
  public noResults = false;
  public name = 'autocomplete_'.concat(random(1, 9999999));
  public _model: any[] = [];
  public inited = false;
  public groupData: { label: string, data: IAutocompleteItem[] }[] = [];
  public panelClasses: string[];

  private _keyword$ = new Subject<InputEvent>();
  private _fetch$ = new Subject<string>();
  private _destroy$ = new Subject();
  private _el = inject(ElementRef);

  public get model() {
    return this._model;
  }

  public get hasValue() {
    return !!(this.model || []).length;
  }

  public get inputEl(): HTMLInputElement {
    return this.matInputEl?.nativeElement;
  }

  private _onTouched: () => void;
  private _onChange: (value: any) => void;
  private _focused = false;

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _dialog: MatDialog,
  ) {
    this.panelClass = '';
    if(!this.compareWith) {
      this.compareWith = (o1: any, o2: any) => {
        return isEqual(o1, o2);
      };
    }
  }

  public registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  @HostListener('dragstart', ['$event'])
  public dragStart(e) {
    e.preventDefault();
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnInit(): void {
    this.inited = !this.initOnClick;
    this._listenFetch();
    this._listenKeywordChange();
  }

  public drop(event: CdkDragDrop<{ index: number }>): void {
    const previousIndex = event.previousContainer.data.index;
    const index = event.container.data.index;

    moveItemInArray(this._model, previousIndex, index);

    this.reordered.emit({
      item: this._model[index],
      from: previousIndex,
      to: index,
      items: this._model,
    });

    this._updateModel(this._model);
  }

  public selectAll(): void {
    this.data.forEach((selected) => {
      if (selected.type === DataType.Object) {
        this._addObject(selected);
      }

      if (selected.type === DataType.Text) {
        this._addText(selected.data);
      }
    });
  }

  public inputed(event): void {
    if (this.readonly || this.disabled) {
      return;
    }

    this._keyword$.next(event);
  }

  public keyDown(event: KeyboardEvent): void {
    if (this.readonly || this.disabled || ['ArrowDown', 'ArrowUp'].indexOf(event.code) !== -1) {
      return;
    }
    
    if(
      (event.keyCode === KEY_BACKSPACE || event.keyCode === KEY_DELETE) &&
      !this.keywordLength
    ) {
      if (this.multiple) {
        this.model.pop();
        this._updateModel(this.model);
      } else {
        this._updateModel([]);
      }
    } else if (event.code === 'Enter') {
      if(!this.allowText) {
        this.unfocus();
      }

      return;
    }
  }

  public chipFocus(event: FocusEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  }

  public chipRemovedMousedown(event: UIEvent): void {
    // Used to bypass focus event
    event.preventDefault();
  }

  public chipRemoved(item): void {
    this._model = this.model
      .filter((modelItem) => modelItem !== item);

    this._updateModel(this._model);
    this.removed.emit(item);

    if (this.autocomplete.isOpen) {
      if (!this._focused) {
        this.focus();
      } else {
        this._fetch$.next(this.keyword);
      }
    } else {
      this.unfocus();
    }
  }

  public focus(): void {
    if (!this.disabled) {
      this.inited = true;
      this._cdRef.markForCheck();
      this.inputEl.focus();
    }    
  }

  public unfocus() {
    if((document as any).activeElement?.blur) {  
      (document as any).activeElement.blur();
    }
  }

  public clearClick(): void {
    this.clear(true);
    this.clearEvent.emit();
  }

  public clear(closePanel = true): void {
    if (closePanel) {
      this.closePanel();
    }

    this._clearInput();
    this._clearData();
    this.noResults = false;
    this._updateModel([]);
  }

  public closePanel(): void {
    this.autocompleteTrigger?.closePanel();
  }

  public openPanel(): void {
    this.autocompleteTrigger?.openPanel();
  }

  public opened(): void {
    this._updateStaticDirectives();

    // Rezize panel to input width and do it a few times because of Mat dialog auto resize
    timer(0, 100)
      .pipe(  
        take(3),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        const panel = document.getElementById(this.autocomplete.id)?.parentElement;
        if(panel) {
          const width = this._el.nativeElement.offsetWidth < 200 ? 
            200 : 
            this._el.nativeElement.offsetWidth;
          panel.style.width = `${width}px`;
        }
      });
  }

  public closed(): void {
    setTimeout(() => {
      if (!this.confirm) {
        this._close();
      }

      if (this.initOnClick) {
        this.inited = false;
        this._cdRef.markForCheck();
      }

      this._clearData();
    });
  }

  public blured(): void {  
    setTimeout(() => {

      this._focused = false;
      this.keyword = '';
    
      this.autoSizeInput.updateWidth();
    
      of(true)
        .pipe(
          filter(() => this.confirm),
          delay(100),
          filter(() => !!this.keyword),
          switchMap(() => this._dialog.open(ConfirmComponent, {
            disableClose: true,
          })
            .afterClosed(),
          ),
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe((result) => {
          this._focused = true;
          switch (result) {
            case 'review':
              this.inputEl.focus();

              break;

            case 'discard':
              this._clearInput();
              break;
          }
        });
    },100);
  }

  public focused(): void {
    this.inited = true;
    this._focused = true;
    this._cdRef.markForCheck();

    if (this.fetchOnFocus) {
      this._fetch$.next(this.keyword);
      this.autocompleteTrigger.openPanel();
    }
  }

  public optionTextClick(event: UIEvent, value: any): void {
    this.optionClick(event, value);
    this._clearData();
  }

  public optionObjectClick(event: UIEvent, value: any): void {
    this.optionClick(event, value);
  }

  public optionClick(event: UIEvent, value: any): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    this._select(value);
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      return;
    }

    this._select(event.option.value);
  }

  public writeValue(value: any): void {
    if (value) {
      value = Array.isArray(value) ? value : [value];

      value = value.map((item) => {
        return typeof item === 'object' ?
          this._createObjectItem(item) :
          this._createTextItem(item, true);
      });

    } else {
      value = [];
    }

    this._model = value;
    this._cdRef.markForCheck();
  }

  public staticClick(event: MouseEvent, index): void {
    event.stopPropagation();
    event.preventDefault();

    const staticDirective: FsAutocompleteChipsStaticDirective = this.staticDirectives.toArray()[index];
    staticDirective.click.emit(event);
    staticDirective.selected.emit(this.keyword);

    if (this.inputEl) {
      this.inputEl.blur();
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public validText(text): boolean {
    return String(text).trim().length && (!this.validateText || this.validateText(text));
  }
  
  public get keywordLength(): number {
    return typeof this.keyword === 'string' ? this.keyword.length : 0; 
  }

  private _clearData(): void {
    this.data = null;
    this.groupData = [];
  }

  private _clearInput(): void {
    if (this.inputEl) {
      this.inputEl.value = '';
    }

    this.textData = {};
    this.keyword = '';
    this._cdRef.markForCheck();
  }

  private _select(selected): void {
    if (this.data) {
      const index = this.data.indexOf(selected);

      if (index !== -1) {
        this.data.splice(index, 1);
      }

      if(this.groupBy) {
        this._groupBy();
      }
    }

    if (!this.multiple) {
      this._model = [];
    }

    const value = this.allowObject && this.allowText ? selected : selected.data;
    if (!this._model.includes(value)) {
      switch (selected.type) {
        case DataType.Object:
          this._addObject(selected);
          this.selected.emit(selected);
          break;

        case DataType.Text:
          this._addText(selected.data);
          this.selected.emit(selected.data);
          break;
      }
    }

    if (this.multiple) {
      this._clearInput();
      setTimeout(() => {
        if (this.autocompleteTrigger) {
          this.autocompleteTrigger.updatePosition();
        }
      });
    } else {
      this._clearInput();
      this._close();
      this.closePanel();
    }


  }

  private _createTextItem(data, valid: boolean): IAutocompleteItem {
    return {
      data,
      type: DataType.Text,
      valid,
    };
  }

  private _createObjectItem(data): IAutocompleteItem {
    return {
      data,
      type: DataType.Object,
      image: getObjectValue(data, this.chipImage),
      icon: getObjectValue(data, this.chipIcon),
      iconColor: getObjectValue(data, this.chipIconColor) || this.chipIconColor,
      class: getObjectValue(data, this.chipClass) || this.chipClass,
      background: getObjectValue(data, this.chipBackground) || this.chipBackground,
      color: getObjectValue(data, this.chipColor) || this.chipColor,
    };
  }

  private _updateModel(value): void {
    this._model = value;

    const model = this._model.map((item) => {
      if (!this.allowText || !this.allowObject) {
        return item.data;
      }

      return item;
    });

    this._onChange(this.multiple ? model : model[0]);
    this._onTouched();
  }

  private _addObject(object): void {
    this._updateModel([...this._model, object]);
  }

  private _addText(text): void {
    if (this.validText(text)) {
      const textObject = this._createTextItem(text, true);
      this._updateModel([...this._model, textObject]);
    }
  }

  private _close(): void {
    this._clearInput();
  }

  private _fetch(): void {
    this._fetch$.next(null);
  }

  private _getKeyword() {
    return this.inputEl?.value.trim() || '';
  }

  private _updateStaticDirectives() {
    this.staticDirectives.forEach((staticDirective) => {
      staticDirective.isShow = staticDirective.show(this._getKeyword());
      staticDirective.isDisabled = staticDirective.disable(this._getKeyword());
    });
  }

  private _listenKeywordChange(): void {
    this._keyword$
      .pipe(
        tap(() => {
          this._updateStaticDirectives();
          this._cdRef.markForCheck();
        }),
        tap(() => {
          setTimeout(() => {
            this.autocomplete.panel?.nativeElement.classList.add('fetching');
          });
        }),
        tap((e) => {
          let keyword = this._getKeyword();

          if (this.allowText) {
            if (e.data === ',') {
              this._select({
                type: DataType.Text,
                data: keyword,
              });

              this._clearInput();
              keyword = '';
            }
          }

          this.keyword = keyword;
        }),
        debounce(() => {
          let timerDelay = 0;
          if (this.keyword.length && this.allowObject) {
            timerDelay = this.delay;
          }

          return timer(timerDelay);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._fetch$.next(this.keyword);
      });
  }

  private _listenFetch(): void {
    this._fetch$
      .pipe(
        switchMap((keyword) => {
          this.autocompleteTrigger.openPanel();
          this._cdRef.markForCheck();

          if (this.allowText) {
            this.textData = this._createTextItem(keyword, this.validText(keyword));
          }

          if (this.allowObject) {
            this.noResults = false;

            return this._doFetchByKeyword(keyword);
          }

          return of([]);
        }),
        tap(() => this.autocomplete.panel?.nativeElement.classList.remove('fetching')),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });
  }

  private _doFetchByKeyword(keyword: string): Observable<unknown> {
    return this.fetch(keyword || '')
      .pipe(
        tap((response: unknown) => {
          if (!Array.isArray(response)) {
            return;
          }

          this.data = response.map((data) => {
            return this._createObjectItem(data);
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

          if(this.groupBy) {
            this._groupBy();
          }

          this.noResults = !this.data.length;
        }),
      );
  }
  private _groupBy() {
    this.groupData = Object.values(this.data
      .reduce((acc, item) => {
        const label = this.groupBy(item.data);
        acc[label] = {
          label,
          data: [
            ...(acc[label]?.data || []),
            item,
          ],
        };

        return acc;
      }, []));
  }

}
