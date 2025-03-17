import { Directive } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsSubtemplate]',
})
export class FsAutocompleteChipsSubtemplateDirective {
  
  public static ngTemplateContextGuard(
    dir: FsAutocompleteChipsSubtemplateDirective,
    ctx: unknown,
  ): ctx is  {
    $implicit: string;
    selecting: boolean;
    object: any;
    index: number;
  } {
    return true;
  }
}
