import {NgModel} from "@angular/forms";
import {Component,EventEmitter,ViewChild,ViewContainerRef, Input, ComponentFactoryResolver,ViewChildren, QueryList, ElementRef, Renderer , forwardRef} from "@angular/core";
import {InternalChosenOption, ChosenOption, ChosenOptionGroup} from "./chosen-commons";
import {AbstractChosenComponent} from "./chosen-abstract";
import {ChosenDropComponent} from "./chosen-drop.component";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const ChosenSingleComponent_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChosenSingleComponent),
  multi: true
};

@Component({
  selector: 'chosen-single',
  template: `
    <div class="chosen-container chosen-container-single"
        [class.chosen-container-active]="chosenContainerActive"
        [class.chosen-with-drop]="chosenWithDrop">

         <a (click)="chosenFocus()"  class="chosen-single"
               [class.chosen-single-with-deselect]="!isSelectionEmpty() && allow_single_deselect"
               [class.chosen-default]="isSelectionEmpty()">
                <span [ngSwitch]="isSelectionEmpty()">
                    <span *ngSwitchCase="true">
                        {{placeholder_text_single}} 
                    </span>
                    <span *ngSwitchCase="false">
                        {{singleSelectedOption.label}}
                    </span>
                </span>
                <abbr *ngIf="!isSelectionEmpty() && allow_single_deselect"
                    (click)="deselectOption(singleSelectedOption , $event)" class="search-choice-close">
                </abbr>
                <div><b></b></div>
        </a>

       <div #dropMenu></div>
    </div>`,
     host: {
    '(document:click)': 'onDoucumentClick($event)'
  },
    providers: [ChosenSingleComponent_CONTROL_VALUE_ACCESSOR]
})
export class ChosenSingleComponent extends AbstractChosenComponent<string>  {

  @Input()
  no_results_text = AbstractChosenComponent.NO_RESULTS_TEXT_DEFAULT;

  @Input() allow_single_deselect: boolean = false;

  @Input()
  placeholder_text_single: string = "Select an Option";

  @Input()
  disable_search = false;

  @Input()
  disable_search_threshold: number = 0;

  @Input()
  max_shown_results = null;

  @Input()
  set options(options: Array<ChosenOption>) {
    super.setOptions(options);
  }

  @Input()
  protected set groups(groups: Array<ChosenOptionGroup>) {
    super.setGroups(groups);
  }

  @ViewChildren(ChosenDropComponent)
  private chosenDropComponentQueryList: QueryList<ChosenDropComponent>;

  private singleSelectedOption: InternalChosenOption;

  @ViewChild('dropMenu', { read: ViewContainerRef })
  dropMenuContainerRef: ViewContainerRef;

  constructor(protected el: ElementRef, protected renderer: Renderer, public componentFactoryResolver: ComponentFactoryResolver,) {
    super(el, renderer);
  }

   ngOnInit() {
  }

  ngAfterViewInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ChosenDropComponent);
    this.chosenDropComponent = this.dropMenuContainerRef.createComponent(factory).instance
    this.chosenDropComponent.disableSearch = this.isSearchDisabled()
    this.chosenDropComponent.no_results_text = this.no_results_text
    this.chosenDropComponent.display_selected_options = true
    this.chosenDropComponent.filterMode = this.filterMode;
    this.chosenDropComponent.options = this.dropOptions
    this.chosenDropComponent.inputElementContainer = this.el.nativeElement.querySelector(".chosen-container");
    var inputKeyUpEventEmitter:EventEmitter<string>= new EventEmitter();
    inputKeyUpEventEmitter.subscribe((event)=>{
      this.inputKeyUp(event)
    })
    this.chosenDropComponent.inputKeyUp = inputKeyUpEventEmitter

    var optionSelectedEventEmitter:EventEmitter<InternalChosenOption>= new EventEmitter();
    optionSelectedEventEmitter.subscribe((event)=>{
      this.selectOption(event)
    })
    this.chosenDropComponent.optionSelected = optionSelectedEventEmitter
    
  }

  isSearchDisabled() {
    return this.disable_search
      || (this.disable_search_threshold !== 0 && this.options_ !== null && this.options_.length <= this.disable_search_threshold);
  }

  isOptionInitiallySelected(option: InternalChosenOption): boolean {
    return this.initialValue == option.value;
  }

  protected initialSelection(initialSelection: Array<InternalChosenOption>) {
    if (initialSelection !== null && initialSelection.length > 0) {
      this.singleSelectedOption = initialSelection[0];
    }
  }

  isSelectionEmpty(): boolean {
    return !!!this.singleSelectedOption;
  }

  updateModel() {
    if (this.singleSelectedOption === null) {
      this.onChange(null);
    } else {
      this.onChange(this.singleSelectedOption.value);
    }
  }

  selectOption(option) {
    if(this.singleSelectedOption){
      this.singleSelectedOption.selected = false;
    }
    this.singleSelectedOption = option;
    option.selected = true;
    this.updateModel();
    this.chosenBlur();
  }

  deselectOption(option, $event) {
    if ($event !== null) {
      $event.stopPropagation();
    }
    option.selected = false;
    this.chosenDropComponent.unHighlight(option);
    this.singleSelectedOption = null;
    this.updateModel();
  }

  onChosenFocus(): boolean {
    this.onTouched()
    this.chosenDropComponent.inputFocus();
    return true;
  }

  protected getOptionToHighlight() {
    if (this.singleSelectedOption !== null) {
      return this.singleSelectedOption;
    }
  }

  onDoucumentClick(event){
    // if(!this.el.nativeElement.contains(event.target)){
    //     this.chosenBlur();
    // }
  }

  onChosenBlur() {

  }
}

