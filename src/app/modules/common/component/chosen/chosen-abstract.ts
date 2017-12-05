import {InternalChosenOption, InternalChosenOptionGroup, ChosenOption, ChosenOptionGroup} from "./chosen-commons";
import {ElementRef, Renderer} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";
import {ChosenDropComponent} from "./chosen-drop.component";

export abstract class AbstractChosenComponent<T> implements ControlValueAccessor {

  protected static NO_RESULTS_TEXT_DEFAULT = "No results match";

  protected chosenDropComponent: ChosenDropComponent;

  protected initialValue: T;

  public options_: Array<InternalChosenOption>;

  public dropOptions: Array<InternalChosenOption>;

  groups_: Array<InternalChosenOptionGroup>;

  public chosenContainerActive: boolean = false;

  public chosenWithDrop: boolean = false;

  protected inputValue: string;

  filterMode: boolean;

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  constructor(protected el: ElementRef, protected renderer: Renderer) {

  }

  protected setOptions(options: Array<ChosenOption>) {
    if (options != null) {
      this.options_ = options.map(option => {
        return new InternalChosenOption(option.value, option.label, option.group);
      });
      this.updateOptions();
    }
  }

  protected setGroups(groups: Array<ChosenOptionGroup>) {
    if (groups != null) {
      this.groups_ = [];
      for (let i = 0; i < groups.length; i++) {
        let group: ChosenOptionGroup = groups[i];
        this.groups_.push({value: group.value, label: group.label, index: i});
        this.updateOptions();
      }
    }
  }

  writeValue(value: T): void {
    if (value != null) {
      this.initialValue = value;
      this.updateOptions();
    }
  }

  protected updateOptions() {
    if (this.options_ != null) {
      if (this.initialValue != null) {
        let initialSelection: Array<InternalChosenOption> = [];
        this.options_.forEach((option: InternalChosenOption) => {
          if (this.isOptionInitiallySelected(option)) {
            initialSelection.push(option);
            option.selected = true;
          } else {
            option.selected = false;
          }
        });
        this.initialSelection(initialSelection);
      }

      if (this.groups_ != null) {
        this.options_.forEach((option: InternalChosenOption) => {
          if (option.group != null) {
            let optionGroup: InternalChosenOptionGroup = this.groups_.find(group => group.value === option.group);
            option.groupIndex = optionGroup.index;
            option.groupObject = optionGroup;
          } else {
            option.groupIndex = -1;
          }
        });
        this.options_.sort((a: InternalChosenOption, b: InternalChosenOption) => a.groupIndex - b.groupIndex);
      }
      this.dropOptions = this.options_;
    }
  }

  protected inputKeyUp(inputValue) {
    this.filterMode = true;
    let dropOptions = null;
    if (inputValue.trim().length > 0) {
      this.options_.forEach((option: InternalChosenOption) => {
        let indexOf = option.label.toLowerCase().indexOf(inputValue.toLowerCase());
        if (indexOf > -1) {
          let subString = option.label.substring(indexOf, indexOf + inputValue.length);
          option.labelWithMark = option.label.replace(subString, `<em>${subString}</em>`);
          if (dropOptions == null) {
            dropOptions = [];
          }
          dropOptions.push(option);
        }
      });
      this.dropOptions = dropOptions;
      this.filterMode = true;
    } else {
      this.dropOptions = this.options_;
      this.filterMode = false;
    }
    this.highlightOption();
  }

  highlightOption() {
    let optionToHighlight = this.getOptionToHighlight();
    if (optionToHighlight != null) {
      this.chosenDropComponent.highlight(optionToHighlight);
    }
  }

  protected abstract getOptionToHighlight(): InternalChosenOption;

  protected abstract isOptionInitiallySelected(InternalChosenOption): boolean;

  protected abstract initialSelection(initialSelection: Array<InternalChosenOption>);

  abstract isSelectionEmpty(): boolean;

  abstract updateModel();

  abstract selectOption(option: InternalChosenOption)

  abstract deselectOption(option: InternalChosenOption, event);

  chosenFocus() {
    if (!this.onChosenFocus()) {
      return;
    }

    this.chosenContainerActive = true;
    this.chosenWithDrop = true;
    this.highlightOption();
  }

  abstract onChosenFocus(): boolean;

  chosenBlur() {
    this.chosenContainerActive = false;
    this.chosenWithDrop = false;
    this.filterMode = false;
    this.onChosenBlur();
  }

  abstract onChosenBlur();

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

}
