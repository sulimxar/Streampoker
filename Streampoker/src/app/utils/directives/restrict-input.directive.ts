import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRestrictInput]'
})
export class RestrictInputDirective {
  
  @Input() appRestrictInput: string;

  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    const regex: RegExp = new RegExp(this.appRestrictInput, 'g');
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }
}
