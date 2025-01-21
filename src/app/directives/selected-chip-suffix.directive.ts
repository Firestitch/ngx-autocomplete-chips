import { Directive, EventEmitter, Input, Output } from '@angular/core';


@Directive({
  selector: '[fsAutocompleteChipSelectedSuffix]',
})
export class FsAutocompleteChipSelectedSuffixDirective {
  
  @Input() public icon: string;

  @Input() public link: string;

  @Input() public linkTarget: string;

  @Input() public color: string;

  @Output() public click = new EventEmitter<{ event: MouseEvent, data: any }>();

}
