import {NgModel} from "@angular/forms";
import {Component,Injector,EventEmitter,ViewChild,ViewContainerRef, Input, ComponentFactoryResolver,ViewChildren, QueryList, ElementRef, Renderer , forwardRef} from "@angular/core";
import {InternalChosenOption, ChosenOption, ChosenOptionGroup} from "./chosen-commons";
import {AbstractChosenComponent} from "./chosen-abstract";
import {ChosenDropComponent} from "./chosen-drop.component";
import { NG_VALUE_ACCESSOR, ControlValueAccessor,FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Routes, Router,RouterModule,ActivatedRoute } from '@angular/router';
import {DialogService} from "../dialog/dialog.service"
import {Observable,Subscription} from 'rxjs/Rx';
import {AppService} from '../../services/app.service'

export const ChosenSelect3Component_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Select3Component),
  multi: true
};

@Component({
  selector: 'select3',
  template: `
    <div class="chosen-container chosen-container-single"
        [class.chosen-container-active]="chosenContainerActive"
        [class.chosen-with-drop]="chosenWithDrop">
         <div class="chosen-single">
             <input #inputTxt class="form-control" [placeholder]="placeholder_text_single" (focusin)="onFocusIn()" (focusout)="onFocusOut()"  type="text" [formControl]="inputTextControl">
             <div><i class="fa fa-plus" (click)="add($event)"></i><i (click)="more($event)" class="fa fa-ellipsis-h"></i></div>
         </div>

       <div #dropMenu></div>
    </div>`,
     host: {
  },
    providers: [ChosenSelect3Component_CONTROL_VALUE_ACCESSOR]
})
export class Select3Component extends AbstractChosenComponent<string>  {

  @Input()
  no_results_text = AbstractChosenComponent.NO_RESULTS_TEXT_DEFAULT;

  @Input() allow_single_deselect: boolean = false;

  @Input()
  config = {};


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

  @ViewChild("inputTxt") inputTxt:ElementRef

  inputTextControl:FormControl = new FormControl()

  inputStream:Observable<any>;
  inputChangeSub:Subscription;


  constructor( public router: Router,
    protected el: ElementRef, 
    protected renderer: Renderer,
    public injector: Injector,
    public dialogService:DialogService,
    private appService:AppService,
    public componentFactoryResolver: ComponentFactoryResolver,) {
    super(el, renderer);
  }

   ngOnInit() {
  }

  ngAfterViewInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ChosenDropComponent);
    this.chosenDropComponent = this.dropMenuContainerRef.createComponent(factory).instance
    this.chosenDropComponent.disableSearch = true
    this.chosenDropComponent.no_results_text = this.no_results_text
    this.chosenDropComponent.display_selected_options = true
    this.chosenDropComponent.filterMode = false
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
    this.chosenDropComponent.optionSelected = optionSelectedEventEmitter;

    this.inputStream = this.inputTextControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged();

     
  }

  writeValue(value): void {
      if (value != null && value!="") {
       this.initialValue = value;
       var option = new InternalChosenOption(value["_id"],value["name"],"")
       option.labelWithMark = value["name"];
       this.selectOption(option)
     }
  }


  bindInputChange(){
     this.inputChangeSub = this.inputStream.subscribe(input => {
          this.onSearch(input)
      });
  }

  unbindInputChange(){
    if(this.inputChangeSub){
      this.inputChangeSub.unsubscribe()
      this.inputChangeSub = null;
    }
  }

  isSearchDisabled() {
    return this.disable_search
      || (this.disable_search_threshold !== 0 && this.options_ !== null && this.options_.length <= this.disable_search_threshold);
  }

  isOptionInitiallySelected(option: InternalChosenOption): boolean {
    if(_.isObject(this.initialValue))
      return this.initialValue["_id"] == option.value;
    return this.initialValue == option.value;
  }

  protected initialSelection(initialSelection: Array<InternalChosenOption>) {
    if (initialSelection !== null && initialSelection.length > 0) {
      this.singleSelectedOption = initialSelection[0];
      this.updateModel()
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
    this.inputTextControl.setValue(option.label);
    this.inputTxt.nativeElement.blur()
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


  onFocusIn(){
    this.inputTxt.nativeElement.select()
    this.onSearch(this.inputTextControl.value)
    this.bindInputChange()
  }

  onFocusOut(){
    this.chosenDropComponent.visible = false;
    if(this.singleSelectedOption){
      this.inputTextControl.setValue(this.singleSelectedOption.label)
    }
    else{
      this.inputTextControl.setValue("")
    }
    this.chosenDropComponent.filterMode = false
    this.unbindInputChange()
  }

  onSearch(text){
    if(text=="" || text==null){
      if(this.chosenDropComponent._visible)
        this.chosenDropComponent.visible = false;
      return;
    }
    let params = {
      sort:"-_id",
      "name__regex":text
    }
    let moduleArr = this.config["dataSource"].split(".")
    let moduleConfig = this.appService.getAppModuleConfig(moduleArr[0],moduleArr[1])
    let apiName = `${moduleArr[0]}.${moduleArr[1]}DataApi`;
    let resource = this.injector.get(apiName).resource 
    resource.get(params).subscribe((data) => {
      let res = data.json()
      let results = res.result;
      if(!this.chosenDropComponent._visible)
        this.chosenDropComponent.visible = true;
      this.chosenDropComponent.filterMode = true
      this.buildDropOptions(results)
    },(error)=>{
      
    })
  }

  buildDropOptions(data){
     let options = []
     data.forEach((item)=>{
        var option = new InternalChosenOption(item["_id"],item["name"],"")
        option.labelWithMark = item["name"];
        if(this.singleSelectedOption && item["_id"]==this.singleSelectedOption.value)
          option.selected = true;
        options.push(option)
     })
     if(options.length==0){
        options = null;
        this.chosenDropComponent.inputValue = this.inputTextControl.value;
     }
     this.dropOptions = options;
     this.chosenDropComponent.options = this.dropOptions
  }

  add(event){
    let module = this.config["dataSource"];
    let moduleArr = module.split(".")
    this.router.navigate(["apps/"+moduleArr[0]+"/"+moduleArr[1],"add"]);

  }

  more(event){
    let initIds = []
    if(this.singleSelectedOption){
      initIds = [this.singleSelectedOption.value];
    }
    this.dialogService.modalTable(this.config["dataSource"],initIds).then((res) => {
          if(res.selectedObjs.length>0){
            let first = res.selectedObjs[0];
            var option = new InternalChosenOption(first["_id"],first["name"],"")
            option.labelWithMark = first["name"];
            this.selectOption(option)

          }
         
      }, (reason) => {
       
    })
  }

  onChosenBlur() {

  }
}

