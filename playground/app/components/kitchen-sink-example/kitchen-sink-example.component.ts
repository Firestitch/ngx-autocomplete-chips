import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatOption } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

import { email } from '@firestitch/common';
import { FsMessage } from '@firestitch/message';

import { isEqual } from 'lodash-es';
import { ExampleService } from 'playground/app/services/example.service';

import { FsAutocompleteChipsComponent } from '../../../../src/app/components/autocomplete-chips/autocomplete-chips.component';
import { FsAutocompleteChipsSubtemplateDirective } from '../../../../src/app/directives/autocomplete-chips-subtemplate.directive';
import { FsAutocompleteChipsNoResultsDirective } from '../../../../src/app/directives/autocomplete-no-results.directive';
import { FsAutocompleteObjectDirective } from '../../../../src/app/directives/autocomplete-object.directive';
import { FsAutocompleteChipsPrefixDirective } from '../../../../src/app/directives/chips-prefix.directive';
import { FsAutocompleteChipsSuffixDirective } from '../../../../src/app/directives/chips-suffix.directive';
import { FsAutocompleteChipSelectedSuffixDirective } from '../../../../src/app/directives/selected-chip-suffix.directive';
import { FsAutocompleteChipsStaticDirective } from '../../../../src/app/directives/static-template.directive';
import { FsAutocompleteChipsTextValidIndicatorDirective } from '../../../../src/app/directives/text-valid-indicator.directive';


interface KitchenSinkConfig {
  // Data
  limit: number;
  latency: number;
  emptyResults: boolean;
  dataColors: boolean;

  // Behaviour
  multiple: boolean;
  multipleAdd: boolean;
  allowObject: boolean;
  allowText: boolean;
  validateText: boolean;
  removable: boolean;
  allowClear: boolean;
  readonly: boolean;
  disabled: boolean;
  fetchOnFocus: boolean;
  initOnClick: boolean;
  orderable: boolean;
  confirm: boolean;
  delay: number;
  compareWith: boolean;
  groupBy: '' | 'gender' | 'department';

  // Form field
  appearance: 'fill' | 'outline';
  floatLabel: 'always' | 'auto';
  label: string;
  placeholder: string;
  hint: string;
  padless: boolean;

  // Chips
  size: 'small' | 'medium' | 'large';
  shape: 'roundChip' | 'squareChip' | 'none';
  chipImage: boolean;
  chipIcon: boolean;
  chipIconColor: string;
  chipClass: string;

  // Panel
  minPanelWidth: number;
  panelWidth: number;
  maxPanelHeight: number;
  panelClass: string;

  // Content slots
  slotPrefix: boolean;
  slotSuffix: boolean;
  slotChipSuffix: boolean;
  slotSubtemplate: boolean;
  slotNoResults: boolean;
  slotStatic: boolean;
  slotTextValidIndicator: boolean;
}

interface LoggedEvent {
  name: string;
  time: string;
  payload: string;
}

const defaultConfig: KitchenSinkConfig = {
  limit: 10,
  latency: 70,
  emptyResults: false,
  dataColors: true,

  multiple: true,
  multipleAdd: true,
  allowObject: true,
  allowText: false,
  validateText: false,
  removable: true,
  allowClear: true,
  readonly: false,
  disabled: false,
  fetchOnFocus: true,
  initOnClick: false,
  orderable: false,
  confirm: false,
  delay: 200,
  compareWith: false,
  groupBy: '',

  appearance: 'fill',
  floatLabel: 'always',
  label: 'Account',
  placeholder: 'Start typing to search',
  hint: 'Pick one or more accounts',
  padless: false,

  size: 'medium',
  shape: 'roundChip',
  chipImage: true,
  chipIcon: false,
  chipIconColor: '#ffffff',
  chipClass: '',

  minPanelWidth: 200,
  panelWidth: null,
  maxPanelHeight: 400,
  panelClass: '',

  slotPrefix: true,
  slotSuffix: false,
  slotChipSuffix: true,
  slotSubtemplate: false,
  slotNoResults: false,
  slotStatic: true,
  slotTextValidIndicator: false,
};

@Component({
  selector: 'kitchen-sink-example',
  templateUrl: './kitchen-sink-example.component.html',
  styleUrls: ['./kitchen-sink-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,

    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatExpansionModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    MatSlideToggle,
    MatTab,
    MatTabGroup,

    FsAutocompleteChipsComponent,
    FsAutocompleteObjectDirective,
    FsAutocompleteChipsSubtemplateDirective,
    FsAutocompleteChipsNoResultsDirective,
    FsAutocompleteChipsPrefixDirective,
    FsAutocompleteChipsSuffixDirective,
    FsAutocompleteChipSelectedSuffixDirective,
    FsAutocompleteChipsStaticDirective,
    FsAutocompleteChipsTextValidIndicatorDirective,
  ],
})
export class KitchenSinkExampleComponent implements OnInit {

  @ViewChild(FsAutocompleteChipsComponent)
  public autocomplete: FsAutocompleteChipsComponent;

  public config: KitchenSinkConfig = { ...defaultConfig };
  public model: any = null;
  public events: LoggedEvent[] = [];

  private _cdRef = inject(ChangeDetectorRef);
  private _exampleService = inject(ExampleService);
  private _message = inject(FsMessage);

  public ngOnInit(): void {
    this.preload();
  }

  public get chipImage(): string {
    return this.config.chipImage ? 'image' : null;
  }

  /**
   * Unlike chipIconColor/chipClass/chipBackground/chipColor, chipIcon has no
   * literal fallback in the component, so it only ever resolves as a path.
   */
  public get chipIcon(): string {
    return this.config.chipIcon ? 'icon' : null;
  }

  /**
   * chipBackground/chipColor take either a literal value or a path into the
   * fetched object. Toggling dataColors switches between both modes.
   */
  public get chipBackground(): string {
    return this.config.dataColors ? 'background' : null;
  }

  public get chipColor(): string {
    return this.config.dataColors ? 'color' : null;
  }

  public get groupByFn(): (item: any) => string {
    return this.config.groupBy ? this.groupBy : null;
  }

  public get validateTextFn(): (text: string) => boolean {
    return this.config.validateText ? this.validateText : null;
  }

  /** True while the model holds IAutocompleteItem wrappers rather than raw values. */
  public get wrappedModel(): boolean {
    return this.config.allowText && this.config.allowObject;
  }

  public fetch = (keyword: string) => {
    this._log('fetch()', { keyword });

    return this._exampleService
      .fetchPeople(keyword, {
        limit: this.config.limit,
        latency: this.config.latency,
        empty: this.config.emptyResults,
      });
  };

  public groupBy = (item: any): string => {
    return item[this.config.groupBy] || 'Other';
  };

  public validateText = (text: string): boolean => {
    return email(text);
  };

  public compareWith = (o1: any, o2: any): boolean => {
    if (this.config.compareWith) {
      return o1?.firstName === o2?.firstName && o1?.lastName === o2?.lastName;
    }

    return isEqual(o1, o2) || !!(o1?.id && o2?.id && o1.id === o2.id);
  };

  public showWhenKeyword = (keyword: string): boolean => {
    return !!keyword;
  };

  // --- Model helpers -------------------------------------------------------

  public preload(count = 2): void {
    const people = this._exampleService.people.slice(0, count);

    if (this.wrappedModel) {
      this.model = this.config.multiple ? [] : null;
    } else if (this.config.multiple) {
      this.model = people;
    } else {
      this.model = people[0] ?? null;
    }

    this._cdRef.markForCheck();
  }

  /**
   * allowText/allowObject decide whether the model holds raw values or
   * IAutocompleteItem wrappers, so the model is reset when either changes.
   */
  public dataShapeChanged(): void {
    this.model = this.config.multiple ? [] : null;
    this._log('model reset', 'allowText/allowObject changed');
  }

  public multipleChanged(): void {
    const items = [].concat(this.model ?? []);

    this.model = this.config.multiple ? items : (items[0] ?? null);
  }

  /**
   * Rebuilds the chips so a setting that is only read while a chip is built takes
   * effect on the ones already on screen. Two separate reasons need this:
   *
   * - chipImage/chipIcon/chipIconColor/chipClass/chipBackground/chipColor are
   *   resolved once, in _createObjectItem, and stored on the item. Changing the
   *   input afterwards leaves every existing item holding its old value.
   * - the subtemplate is found by a content query, and fs-autocomplete-chips and
   *   fs-chip are both OnPush, so neither re-evaluates whether one exists.
   *
   * Reassigning the model runs writeValue, which calls markForCheck and rebuilds
   * every item wrapper, which covers both cases.
   */
  public rebuildChips(): void {
    if (Array.isArray(this.model)) {
      this.model = this.model.map((item) => this._rawValue(item));
    } else if (this.model) {
      const value = this._rawValue(this.model);

      this.model = value && typeof value === 'object' ? { ...value } : value;
    }
  }

  public reset(): void {
    this.config = { ...defaultConfig };
    this.events = [];
    this.preload();
  }

  // --- Component API -------------------------------------------------------

  public selectAll(): void {
    this.autocomplete.selectAll();
  }

  public focus(): void {
    this.autocomplete.focus();
  }

  public openPanel(): void {
    this.autocomplete.focus();
    this.autocomplete.openPanel();
  }

  public closePanel(): void {
    this.autocomplete.closePanel();
  }

  public clear(): void {
    this.autocomplete.clear();
  }

  // --- Events --------------------------------------------------------------

  public logEvent(name: string, payload?: unknown): void {
    this._log(name, payload);
  }

  public clearEvents(): void {
    this.events = [];
  }

  public staticSelectAllClick(): void {
    this.selectAll();
    this._message.success('Select All clicked');
  }

  public staticCreateClick(keyword: string): void {
    this._message.success(`Create "${keyword || 'new account'}" clicked`);
  }

  public chipSuffixClick(data: any): void {
    this.autocomplete.closePanel();
    this._message.info(`Chip action on ${data?.firstName ?? data}`);
    this._log('chip suffix', data);
  }

  /** Unwraps an IAutocompleteItem back to its raw value when the model is wrapped. */
  private _rawValue(item: any): any {
    return this.wrappedModel ? item?.data : item;
  }

  private _log(name: string, payload?: unknown): void {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map((part) => String(part).padStart(2, '0'))
      .join(':');

    this.events = [
      { name, time, payload: this._summarize(payload) },
      ...this.events,
    ].slice(0, 40);

    this._cdRef.markForCheck();
  }

  private _summarize(payload: unknown): string {
    if (payload === undefined || payload === null) {
      return '';
    }

    const value = (payload as any)?.data ?? payload;

    if (Array.isArray(value)) {
      return `${value.length} item(s)`;
    }

    if (value && typeof value === 'object') {
      if (value.firstName) {
        return `${value.firstName} ${value.lastName}`;
      }

      if (value.keyword !== undefined) {
        return `keyword: "${value.keyword ?? ''}"`;
      }

      return JSON.stringify(value).slice(0, 120);
    }

    return String(value);
  }

}
