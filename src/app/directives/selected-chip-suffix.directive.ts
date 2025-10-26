import { Directive, EventEmitter, Input, Output } from '@angular/core';


@Directive({
    selector: '[fsAutocompleteChipSelectedSuffix]',
    standalone: true,
})
export class FsAutocompleteChipSelectedSuffixDirective {
  
  @Input() public icon: string;

  @Input() public link: string;

  @Input() public linkTarget: string;

  @Input() public color: string;

  @Input() public show = true;

  @Input() public tooltip: string;

  @Output() public click = new EventEmitter<any>();

  public clicked(e: { event: MouseEvent, data: any; }) {
    e.event.stopPropagation();
    e.event.stopImmediatePropagation();

    this.click.emit(e.data);
  }

}
