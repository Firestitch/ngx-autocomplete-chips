import { Directive } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteObject],[fsAutocompleteChipsTemplate]',
})
export class FsAutocompleteObjectDirective {
  
  public static ngTemplateContextGuard(
    dir: FsAutocompleteObjectDirective,
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
