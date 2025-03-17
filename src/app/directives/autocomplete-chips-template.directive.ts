import { Directive } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteObject],[fsAutocompleteChipsTemplate]',
})
export class FsAutocompleteChipsTemplateDirective {
  
  public static ngTemplateContextGuard(
    dir: FsAutocompleteChipsTemplateDirective,
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
