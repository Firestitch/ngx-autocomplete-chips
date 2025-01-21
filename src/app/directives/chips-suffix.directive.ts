import { Directive } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsSuffix]',
})
export class FsAutocompleteChipsSuffixDirective {

  public static ngTemplateContextGuard(
    dir: FsAutocompleteChipsSuffixDirective,
    ctx: unknown,
  ): ctx is  {
    $implicit: string;
    open: boolean;
  } {
    return true;
  }
}
