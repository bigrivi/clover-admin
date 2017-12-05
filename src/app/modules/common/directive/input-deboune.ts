import { Input, Output, ElementRef, Directive, EventEmitter, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Observable} from 'rxjs/Rx';




@Directive({
  selector: '[input-debounce]'
})
export class InputDebounceDirective {
  @Input() delay: number = 300;
  @Output() valueChange:EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) {
      const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.valueChange.emit(input));

  }
  
  onModelChange(event) {


  }
 

  ngOnDestroy() {
  
  }
}
