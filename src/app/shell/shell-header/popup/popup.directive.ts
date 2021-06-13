import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bgPopup]'
})
export class PopupDirective {

  @HostBinding('class.active')
  open = false;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  @HostListener('document:click', ['$event'])
  clickListener(event: Event) {
    // @ts-ignore
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.open = !this.open;
    } else {
      this.open = false;
    }
  }

}
