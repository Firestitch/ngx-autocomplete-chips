import { Directive, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsStatic]',
  standalone: true,
})
export class FsAutocompleteChipsStaticDirective {
  
  templateRef = inject<TemplateRef<any>>(TemplateRef);


  @Input() public show = (keyword: string) => true;
  @Input() public disable = (keyword: string) => false;

  @Output() public click = new EventEmitter();

  @Output() public selected = new EventEmitter<string>();

  public isShow = true;
  public isDisabled = false;

}
