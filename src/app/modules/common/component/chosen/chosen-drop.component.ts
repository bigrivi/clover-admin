import {Component, Input, Output, HostListener,Renderer,HostBinding,ViewChildren, EventEmitter,Renderer2,ElementRef} from "@angular/core";
import {InternalChosenOption, InternalChosenOptionGroup} from "./chosen-commons";

@Component({
  selector: 'div.chosen-drop',
  template: `
        <div *ngIf="!disableSearch" class="chosen-search">
            <input (blur)="onInputBlur()" (keyup)="onInputKeyup($event.target.value)" [(ngModel)]="inputValue" #chosenInput type="text" autocomplete="off">
        </div>
        <ul class="chosen-results">
            <ng-container *ngFor="let option of options_">

                 <li *ngIf="showGroup(option,i)" class="group-result">{{option.groupObject.label}}</li>
                 <li [class.highlighted]="option.highlighted"
                    [class.result-selected]="isOptionSelected(option)"
                    [class.active-result]="!isOptionSelected(option) || display_selected_options"
                    (mouseover)="highlight(option)"
                    (mouseout)="unHighlight(option)"
                    (click)="selectOption(option)">
                    <span [innerHtml]="getOptionLabel(option)"></span>
                </li>

            </ng-container>
            <li *ngIf="filterMode && options_ == null" class="no-results">{{no_results_text}} "<span>{{inputValue}}</span>"</li>
        </ul>
    `,
    host: {
    '[hidden]': '!_visible'
  },
})
export class ChosenDropComponent {

  inputValue: string;

  _visible:false;

  inputElementContainer;

  appendToElement;

  constructor(public el:ElementRef, public renderer: Renderer,){

  }


  @Input()
  disableSearch = false;

  @Input()
  no_results_text;

  @Input()
  display_selected_options: boolean = false;

  @Input()
  filterMode: boolean = false;

  @Output()
  optionSelected: EventEmitter<InternalChosenOption> = new EventEmitter();

  @Output()
  inputKeyUp: EventEmitter<string> = new EventEmitter();

  @Output()
  inputBlur: EventEmitter<boolean> = new EventEmitter();

  @ViewChildren('chosenInput')
  chosenInputQueryList;

  @Input()
  set options(options: Array<InternalChosenOption>) {
    this.options_ = options;
  }

  @Input()
  set groups(groups: Array<InternalChosenOptionGroup>) {
    this.groups_ = groups;
  }

  options_: Array<InternalChosenOption>;

  groups_: Array<InternalChosenOptionGroup>;

  highlightedOption: InternalChosenOption;

  listeners = []

  isSelfClick = true;

  highlight(option: InternalChosenOption) {
    if (this.highlightedOption != null) {
      this.highlightedOption.highlighted = false;
    }
    if (!this.isOptionSelected(option) || this.display_selected_options) {
      option.highlighted = true;
      this.highlightedOption = option;
    }
  }

  unHighlight(option: InternalChosenOption) {
    option.highlighted = false;
  }

  getOptionLabel(option): string {
    if (this.filterMode) {
      return option.labelWithMark;
    } else {
      return option.label;
    }
  }

  selectOption(option) {
    this.optionSelected.emit(option);
  }

  isOptionSelected(option) {
    return option.selected;
  }

  onInputKeyup(value) {
    this.inputKeyUp.emit(value);
  }

  onInputBlur() {
    this.inputValue = null;
  }

  inputFocus() {
    this.chosenInputQueryList.first.nativeElement.focus();
  }


  showGroup(option: InternalChosenOption, i: number) {
    if (option.group != null && option.groupObject != null) {
      if (i === 0) {
        return true;
      } else {
        return this.options_[i - 1].group !== option.group;
      }
    } else {
      return false;
    }
  }

  set visible(val){
    this._visible = val
    if(val){
        this.position()
        this.bindListenres()
    }
    else{
      this.unBindListeners();
      this.inputKeyUp.emit("");
    }
  }


  position(){
     setTimeout(() => {
          this.setXPostioin();
          this.setYPosition();
          const dimElemRect = this.el.nativeElement.getBoundingClientRect();
          if (dimElemRect.bottom > window.innerHeight){
            this.setYPosition("up")
          }
      });
  }

  setXPostioin(){
    const anchorRect = this.inputElementContainer.getBoundingClientRect();
    const containerRect = this.appendToElement.getBoundingClientRect();
    const left = anchorRect.left - containerRect.left;
    const dimElem = this.el.nativeElement
    this.el.nativeElement.style.left = left  + 'px';
    
  }

  setYPosition(direction = "down"){
    const anchorRect = this.inputElementContainer.getBoundingClientRect();
    const containerRect = this.appendToElement.getBoundingClientRect();
    console.log(containerRect)
    const bottom = anchorRect.bottom - containerRect.top;
    const top = anchorRect.top - containerRect.top;
    if(direction=="down")
      this.el.nativeElement.style.top = (bottom + 1 + 'px');
    else
      this.el.nativeElement.style.top = (top - 1 - this.el.nativeElement.scrollHeight) + 'px';
   
  }
  @HostListener('window:resize')
  onResize(){
      if(this._visible){
          const anchorRect = this.inputElementContainer.getBoundingClientRect();
          this.el.nativeElement.style.width = anchorRect.width+"px"
          this.position()
      }
     
  }

  onScroll(){
    console.log("scroll")
    this.position()
  }

  // @HostListener('click', ['$event'])
  // onClick(event) {
    
  // }

  onBodyClick(event){
   if(!this.el.nativeElement.contains(event.target) && !this.inputElementContainer.contains(event.target)){
        this.visible = false;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case (9):
      case (27):
        this.visible = false;
        break;
    }
  }

  bindListenres(){
      this.listeners.push(
        this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
          this.onKeyPress(e);
        }),
        this.renderer.listen(document, 'scroll', () => {
          this.onScroll();
        }),
        this.renderer.listen(document, 'click', (event) => {
            this.onBodyClick(event);
        })

      )
  }

  unBindListeners(){
      this.listeners.forEach((ul) => ul());
      this.listeners = [];
  }


   ngAfterViewInit() {
    this.appendToElement = document.querySelector('body');
    this.el.nativeElement.style.position = 'absolute';
    this.appendToElement.appendChild(this.el.nativeElement);
    const anchorRect = this.inputElementContainer.getBoundingClientRect();
    this.el.nativeElement.style.width = anchorRect.width+"px"
  }

  ngOnDestroy() {
    this.unBindListeners()
    this.appendToElement.removeChild(this.el.nativeElement);
   
  }
}

