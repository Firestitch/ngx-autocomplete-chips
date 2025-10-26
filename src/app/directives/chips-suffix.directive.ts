import { Directive } from '@angular/core';


@Directive({
    selector: '[fsAutocompleteChipsSuffix]',
    standalone: true,
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
