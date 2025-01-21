import { Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsStatic]',
})
export class FsAutocompleteChipsStaticDirective {

  @Input() public show = (keyword: string) => true;
  @Input() public disable = (keyword: string) => false;

  @Output() public click = new EventEmitter();

  @Output() public selected = new EventEmitter<string>();

  constructor(
    public templateRef: TemplateRef<any>,
  ) { }

  public isShow = true;
  public isDisabled = false;

}
