import { Component, Input, Output, EventEmitter, ElementRef, ContentChild, TemplateRef,
  ViewChild, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { DragulaService } from 'ng2-dragula';

import { filter, list, sort, indexOf } from '@firestitch/common/array';

import { FsAutocompleteChipDirective, FsAutocompleteDirective } from './../../directives';
import { AutocompleteGroup } from './../../interfaces';

import { FS_AUTOCOMPLETE_CHIPS_ACCESSOR } from './../../value-accessors';


@Component({
  selector: 'fs-autocomplete-chips',
  templateUrl: './fs-autocomplete-chips.component.html',
  styleUrls: [ './fs-autocomplete-chips.component.scss' ],
  providers: [FS_AUTOCOMPLETE_CHIPS_ACCESSOR]
})
export class FsAutocompleteChipsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public fetch = null;

  @Input() public placeholder = '';
  @Input() public removable = false;
  @Input() public addOnBlur = false;
  @Input() public selectable = true;
  @Input() public draggable = false;
  @Input() public disabled = false;
  @Input() public indexField = 'id';

  @Input() public groups = false;

  @Output() selected = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() drop = new EventEmitter<any>();

  public uniqueId = null;
  public keyword = '';
  public autocompleteData: object[] | AutocompleteGroup[] = null;

  public separatorKeysCodes = [ENTER, COMMA];

  private _model = [];

  private bagName = 'bag-chips';

  private $drop = null;

  public get model () {
    return this._model;
  }

  @ContentChild(FsAutocompleteChipDirective, { read: TemplateRef }) chipTemplate: FsAutocompleteChipDirective = null;
  @ContentChild(FsAutocompleteDirective, { read: TemplateRef }) autocompleteTemplate: FsAutocompleteDirective = null;

  @ViewChild('keywordInput') keywordInput: ElementRef = null;

  _onTouched = () => { };
  _onChange = (value: any) => { };
  onFocused = (event: any) => { };

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
  registerOnTouched(fn: () => any): void { this._onTouched = fn }

  constructor(private dragula: DragulaService) { }

  private onDrop(args) {

    const model = [];
    const [el, parent] = args;

    for (var i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].tagName === 'MAT-CHIP') {
        const item = filter(this.model, { [this.indexField]: parent.childNodes[i].getAttribute('data-id') })[0];
        model.push(item);
      }
    }

    this.writeValue(model, true);
    this.drop.emit(model);
  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }

  ngOnInit() {
    this.uniqueId = `mat-chip-list${this.hash()}`;
  }

  ngOnChanges(changes) {

    if (!changes) {
      return;
    }

    if (changes.draggable || changes.disabled) {
      if (this.draggable && !this.disabled) {
        this.dragInit();
      } else {
        this.dragRemove();
      }
    }
  }

  dragInit() {
    this.dragula.setOptions(this.bagName, {
      isContainer: el => {

        if (!(el.parentElement && el.parentElement.classList)) {
          return false;
        }

        return !!(el.classList.contains('mat-chip-list-wrapper') && el.parentElement.classList.contains(this.uniqueId));
      },
      direction: 'horizontal'
    });

    this.$drop = this.dragula.drop.subscribe(value => {
      this.onDrop(value.slice(1));
    });
  }

  dragRemove() {
    if (this.$drop) {
      this.dragula.destroy(this.bagName);
      this.$drop.unsubscribe();
    }
  }

  writeValue(value: any, allowEmpty = false): void {
    value = Array.isArray(value) ? value : [];

    if (!allowEmpty && !value.length) {
      return;
    }

    this._model = value;
    this._onChange(this._model);
  }

  keywordChange() {

    if (!this.fetch) {
      this.autocompleteData = [];
      return;
    }

    this.fetch(this.keyword)
    .subscribe(response => {

      const selected = list(this.model, this.indexField);

      if (this.groups) {
        for (let group of response) {
          group['data'] = filter(group.data || [], item => selected.indexOf(item[this.indexField]) === -1);
        }
        this.autocompleteData = response;
      } else {
        this.autocompleteData = filter(response, item => selected.indexOf(item[this.indexField]) === -1);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    // User should select from the list
  }

  onSelected (event: MatAutocompleteSelectedEvent): void {
    this.writeValue([...this._model, ...[event.option.value]], true);
    this.keyword = '';
    this.keywordInput.nativeElement.value = '';
    this.selected.emit(event.option.value);
  }

  onRemove(item) {

    const model = this.model.slice();

    const index = indexOf(model, value => {
      return value[this.indexField] === item[this.indexField];
    });

    if (index !== -1) {
      model.splice(index, 1);
      this.writeValue(model, true);
      this.remove.emit(item);
    }
  }

  onClick(event) {
    this.keywordChange();
    this.keywordInput.nativeElement.blur();
    this.keywordInput.nativeElement.focus();
  }

  private hash() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  ngOnDestroy() {
    this.dragRemove();
  }
}
