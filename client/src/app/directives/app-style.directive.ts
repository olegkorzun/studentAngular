import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAppStyle]'
})
export class AppStyleDirective {

  @Input() color = 'red'
  @Input() backgroundColor = 'white'

  constructor(private el: ElementRef, private ren: Renderer2) { 

  }

  @HostListener('click',['$event']) onClick(event: Event) {
    console.log(event)
  }

  @HostListener('mouseenter',['$event']) onEnter(event: Event) {
    this.ren.setStyle(this.el.nativeElement, 'color', this.color)
    this.ren.setStyle(this.el.nativeElement, 'backgroundColor', this.backgroundColor)
  }

  @HostListener('mouseleave',['$event']) onLeave(event: Event) {
    this.ren.setStyle(this.el.nativeElement, 'color', null)
    this.ren.setStyle(this.el.nativeElement, 'backgroundColor', null)
  }
}
