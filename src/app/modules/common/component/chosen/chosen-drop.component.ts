import {Component, Input, Output, HostListener,Renderer,HostBinding,ViewChildren, EventEmitter,Renderer2,ElementRef} from "@angular/core";
import {InternalChosenOption, InternalChosenOptionGroup} from "./chosen-commons";

@Component({
  selector: 'div.chosen-drop',
  template: `
        <div *ngIf="!disableSearch" class="chosen-search">
            <input (blur)="onInputBlur()" (keyup)="onInputKeyup($event)" [(ngModel)]="inputValue" #chosenInput type="text" autocomplete="off">
        </div>
        <ul class="chosen-results">
            <ng-container *ngFor="let option of options_;let i=index">

                 <li *ngIf="showGroup(option,i)" class="group-result">{{option.groupObject.label}}</li>
                 <li [class.highlighted]="option.highlighted || preSelectedIndex==i"
                    [class.result-selected]="isOptionSelected(option)"
                    [class.active-result]="!isOptionSelected(option) || display_selected_options"
                    (mouseover)="highlight(option,i)"
                    (mouseout)="unHighlight(option,i)"
                    (click)="selectOption(option)">
                    <span [innerHtml]="getOptionLabel(option)"></span>
                </li>

            </ng-container>
            <li *ngIf="filterMode&&options_==null" class="no-results">{{no_results_text}} "<span>{{inputValue}}</span>"</li>
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

  preSelectedIndex;

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
    this.preSelectedIndex = null;
  }

  @Input()
  set groups(groups: Array<InternalChosenOptionGroup>) {
    this.groups_ = groups;
  }

  options_: Array<InternalChosenOption> = [];

  groups_: Array<InternalChosenOptionGroup>;

  highlightedOption: InternalChosenOption;

  listeners = []

  highlight(option: InternalChosenOption,index?) {
    if (this.highlightedOption != null) {
      this.highlightedOption.highlighted = false;
    }
    if (!this.isOptionSelected(option) || this.display_selected_options) {
      option.highlighted = true;
      if(index)
        this.preSelectedIndex = index
      this.highlightedOption = option;
    }
  }

  unHighlight(option: InternalChosenOption,index?) {
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

  onInputKeyup(event) {
    if(event.keyCode!=38 && event.keyCode!=40)
      this.inputKeyUp.emit(event.target.value);
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
        setTimeout(() => {
         this.position()
      });
        this.bindListenres()
    }
    else{
      this.unBindListeners();
      this.inputKeyUp.emit("");
    }
  }




  selectedNext(){
   if(this.preSelectedIndex==null){
      this.preSelectedIndex = 0
    }
    else{
      this.preSelectedIndex++;
      if(this.preSelectedIndex>=this.options_.length){
         this.preSelectedIndex = 0
      }
    }
  }

  selectedPrev(){
    if(this.preSelectedIndex==null){
      this.preSelectedIndex = this.options_.length-1
    }
    else{
      this.preSelectedIndex--;
      if(this.preSelectedIndex<0){
         this.preSelectedIndex = this.options_.length-1
      }
    }
  }


  position(){
      this.setXPostioin();
      this.setYPosition();
      const dimElemRect = this.el.nativeElement.getBoundingClientRect();
      if (dimElemRect.bottom > window.innerHeight){
        this.setYPosition("up")
      }
    
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
      case (38):
        this.selectedPrev()
        event.preventDefault();
        break;
      case (40):
        this.selectedNext()
        event.preventDefault();
        break;
      case(13):
        if(this.preSelectedIndex!=null){
          this.selectOption(this.options_[this.preSelectedIndex])
        }
        break;
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
        this.renderer.listen(document.querySelector(".scrollable-container"), 'scroll', () => {
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

