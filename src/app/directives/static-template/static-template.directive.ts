import { Directive, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipsStatic]'
})
export class FsAutocompleteChipsStaticDirective {
  @Output() click = new EventEmitter();
}
