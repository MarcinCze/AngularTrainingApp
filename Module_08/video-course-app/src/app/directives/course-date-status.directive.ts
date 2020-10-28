import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCourseDateStatus]'
})
export class CourseDateStatusDirective implements OnChanges {
  @Input('appCourseDateStatus') courseDate: Date;

  private freshCourseColor = '0px 0px 5px 0px rgba(9, 228, 20, 1)';
  private upcomingCourseColor = '0px 0px 5px 0px rgba(11, 142, 230, 1)';

  constructor(private el: ElementRef) {
    this.checkStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkStatus();
  }

  protected checkStatus(): void {
    if (this.courseDate == null) {
      return;
    }

    const today = new Date();
    const past = new Date();
    past.setDate(past.getDate() - 14);

    if (this.courseDate < today && this.courseDate >= past) {
      this.setColor(this.freshCourseColor);
      return;
    }

    if (this.courseDate > today) {
      this.setColor(this.upcomingCourseColor);
      return;
    }
  }

  protected setColor(color: string): void {
    this.el.nativeElement.style['box-shadow'] = color;
    this.el.nativeElement.style['-webkit-box-shadow'] = color;
    this.el.nativeElement.style['-moz-box-shadow'] = color;
  }
}
