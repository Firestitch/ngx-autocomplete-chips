import { Directive, Output, EventEmitter, Input, TemplateRef } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsStatic]'
})
export class FsAutocompleteChipsStaticDirective {

  @Input() public showOnEmptyKeyword = true;

  @Output() public click = new EventEmitter();
  
  public constructor(
    public templateRef: TemplateRef<any>
  ) {}

}
