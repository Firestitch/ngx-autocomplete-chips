import { Directive, inject, Input, TemplateRef } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsPrefix]',
})
export class FsAutocompleteChipsPrefixDirective {

  @Input() public icon: string;

  public templateRef = inject(TemplateRef<FsAutocompleteChipsPrefixDirective>);

  public static ngTemplateContextGuard(
    dir: FsAutocompleteChipsPrefixDirective,
    ctx: unknown,
  ): ctx is  {
    $implicit: string;
    open: boolean;
  } {
    return true;
  }
}
