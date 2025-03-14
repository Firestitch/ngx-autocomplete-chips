import { Directive } from '@angular/core';

import { FsAutocompleteChipsTemplateDirective } from './autocomplete-chips-template.directive';


@Directive({
  selector: '[fsAutocompleteChipsSubtemplate]',
})
export class FsAutocompleteChipsSubtemplateDirective {
  
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
