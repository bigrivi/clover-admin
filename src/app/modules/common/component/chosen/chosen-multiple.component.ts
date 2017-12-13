import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {
  Component,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  ComponentFactoryResolver,
  QueryList,
  ElementRef,
  ViewContainerRef,
  Renderer,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { Routes, Router,RouterModule,ActivatedRoute } from '@angular/router';
import {AbstractChosenComponent} from "./chosen-abstract";
import {InternalChosenOption, ChosenOptionGroup, ChosenOption} from "./chosen-commons";
import {ChosenDropComponent} from "./chosen-drop.component";
import {DialogService} from "../dialog/dialog.service"

export const ChosenMultipleComponent_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChosenMultipleComponent),
  multi: true
};

@Component({
  selector: 'chosen-multiple',
  template: `
    <div class="chosen-container chosen-container-multi"
        [class.chosen-container-active]="chosenContainerActive"
        [class.chosen-with-drop]="chosenWithDrop">

        <ul class="chosen-choices" (click)="chosenFocus()">

                <ng-container *ngIf="multipleSelectedOptions != null">
                    <ng-container  *ngFor="let option of multipleSelectedOptions">
                        <li class="search-choice" (click)="$event.stopPropagation()" [class.search-choice-focus]="option.focus" >
                            <span>{{option.label}}</span>
                            <a class="search-choice-close" (click)="deselectOption(option, $event);"></a>
                        </li>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="multipleSelectedOptions?.length==0">
                <span class='placeholder'>{{placeholder_text_single}}</span>
                </ng-container>
                <div><i class="fa fa-plus" (click)="add($event)"></i><i (click)="more($event)" class="fa fa-ellipsis-h"></i></div>
        </ul>

       <div #dropMenu></div>

    </div>
    `,
    providers: [ChosenMultipleComponent_CONTROL_VALUE_ACCESSOR]
})
export class ChosenMultipleComponent extends AbstractChosenComponent<Array<string>> {

  @Input()
  no_results_text = AbstractChosenComponent.NO_RESULTS_TEXT_DEFAULT;

  @Input()
  placeholder_text_multiple: string = "Select Some Options";

  @Input()
  max_shown_results = null;

  @Input()
  protected set options(options: Array<ChosenOption>) {
    super.setOptions(options);
  }

  @Input()
  protected set groups(groups: Array<ChosenOptionGroup>) {
    super.setGroups(groups);
  }

  @Input()
  single_backstroke_delete: boolean = true;

  @Input()
  max_selected_options: number = null;

  @Input()
  placeholder_text_single: string = "Select an Option";

  @Output()
  maxselected: EventEmitter<boolean> = new EventEmitter();

  @ViewChildren(ChosenDropComponent)
  private chosenDropComponentQueryList: QueryList<ChosenDropComponent>;

  @ViewChild('dropMenu', { read: ViewContainerRef })
  dropMenuContainerRef: ViewContainerRef;

  private multipleSelectedOptions: Array<InternalChosenOption>;

  previousInputLength: number = 0;

  selectionCount: number = 0;

  constructor(
    protected el: ElementRef, 
    protected renderer: Renderer, 
    public router: Router,
    public dialogService:DialogService,
    public componentFactoryResolver: ComponentFactoryResolver) {
    super(el, renderer);
  }

  ngAfterViewInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ChosenDropComponent);
    this.chosenDropComponent = this.dropMenuContainerRef.createComponent(factory).instance
    this.chosenDropComponent.no_results_text = this.no_results_text
    this.chosenDropComponent.display_selected_options = true
    this.chosenDropComponent.filterMode = false;
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

  updateModel() {
    if (this.multipleSelectedOptions !== null) {
      this.onChange(this.multipleSelectedOptions.map((option: InternalChosenOption) => option.value));
    } else {
      this.onChange(null);
    }
  }

  protected isOptionInitiallySelected(option: InternalChosenOption): boolean {
    if (!!!this.initialValue) {
      return false;
    }
    return this.initialValue.find(value => value === option.value) != null;
  }

  initialSelection(initialSelection: Array<InternalChosenOption>) {
    if (initialSelection !== null) {
      this.multipleSelectedOptions = initialSelection;
      this.selectionCount = initialSelection.length;
    }
  }

  isSelectionEmpty(): boolean {
    return this.selectionCount === 0;
  }

  selectOption(option) {
    if (option.selected) {
      return;
    }

    if (!this.multipleSelectedOptions) {
      this.multipleSelectedOptions = [];
    }

    option.selected = true;
    this.multipleSelectedOptions.push(option);
    this.selectionCount++;

    if (this.max_selected_options !== null && this.selectionCount === this.max_selected_options) {
      this.maxselected.emit(true);
    }

    this.updateModel();
    this.chosenBlur();
  }


  deselectOption(option, $event) {
    if ($event != null) {
      $event.stopPropagation();
    }
    option.selected = false;
    this.multipleSelectedOptions = this.multipleSelectedOptions.filter((option_: InternalChosenOption) => option_ !== option);
    this.selectionCount--;
    this.updateModel();
  }

  onChosenFocus(): boolean {
    if (this.max_selected_options !== null && this.selectionCount === this.max_selected_options) {
      return false;
    }
    this.inputValue = null;
    this.onTouched()   
    return true;
  }

  onChosenBlur() {
    if (this.isSelectionEmpty()) {
      this.inputValue = this.placeholder_text_multiple;
    } else {
      this.inputValue = null;
    }

    if (this.selectionCount !== 0) {
      let lastOption = this.multipleSelectedOptions[this.multipleSelectedOptions.length - 1];
      if (lastOption.focus) {
        if (lastOption.focus) {
          lastOption.focus = false;
        }
        return;
      }
    }
  }

  multipleInputKeyUp($event) {
    let value = $event.target.value;
    if ($event.keyCode === 8 && this.previousInputLength === 0) {

      if (this.selectionCount === 0) {
        return;
      }

      let lastOption = this.multipleSelectedOptions[this.multipleSelectedOptions.length - 1];

      if (this.single_backstroke_delete || lastOption.focus) {
        this.deselectOption(lastOption, null);
        if (lastOption.focus) {
          lastOption.focus = false;
        }
        return;
      } else {
        lastOption.focus = true;
      }
    }
    this.chosenDropComponent.inputValue = value;
    this.inputKeyUp(value);
    this.previousInputLength = value.length;
  }

  private focusOnLastSelectedOption(focus: boolean) {
    let lastOption = this.multipleSelectedOptions[this.multipleSelectedOptions.length - 1];
  }

  getOptionToHighlight() {
    let options = this.filterMode ? this.dropOptions : this.options_;
    if (options !== null) {
      let firstNonSelectedOption = options.find((option: InternalChosenOption) => !option.selected);
      if (firstNonSelectedOption !== null) {
        return firstNonSelectedOption;
      }
    }
    return null;
  }

  add(event){
    event.stopPropagation();
    this.router.navigate(["apps/product/tag","add"]);
  }

  more(event){
    event.stopPropagation();
    let initIds = this.multipleSelectedOptions.map((item)=>{return item.value});
    this.dialogService.modalTable("product.tag",initIds).then((res) => {
         if (!this.multipleSelectedOptions) {
            this.multipleSelectedOptions = [];
          }
          res.selectedObjs.forEach((item)=>{
              if(initIds.indexOf(item._id)<0){
                var option = new InternalChosenOption(item._id,item.name,"")
                this.multipleSelectedOptions.push(option)
              }
          })
          this.updateModel();
          this.chosenBlur();
      }, (reason) => {
        console.log(reason)
    })
  }
}
