import { ComponentFactoryResolver, ComponentRef, ComponentFactory, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputFieldComponent } from './form-fields/input/input.comonent';
import { SelectFieldComponent } from './form-fields/select/select.comonent';
import { DateFieldComponent } from './form-fields/date/date.comonent';
import { RadioButtonFieldComponent } from './form-fields/radio/radio.comonent';
import {UploaderFieldComponent} from './form-fields/uploader/uploader.comonent';
import { CheckboxFieldComponent } from './form-fields/checkbox/checkbox.comonent';
import { ItemSelectFieldComponent } from './form-fields/select/item-select.comonent';
import { Select3FieldComponent } from './form-fields/select/select3.comonent';
import { RegionFieldComponent } from './form-fields/region/region.comonent';
import { CardInputFieldComponent } from './form-fields/input/card.comonent';


const dynamicComponents: any = {
  text: InputFieldComponent,
  number: InputFieldComponent,
  email: InputFieldComponent,
  password: InputFieldComponent,
  textarea: InputFieldComponent,
  select:SelectFieldComponent,
  date:DateFieldComponent,
  datetime:DateFieldComponent,
  time:DateFieldComponent,
  radio:RadioButtonFieldComponent,
  uploader:UploaderFieldComponent,
  checkbox:CheckboxFieldComponent,
  itemselect:ItemSelectFieldComponent,
  select3:Select3FieldComponent,
  region:RegionFieldComponent,
  cardInput:CardInputFieldComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnChanges, OnInit {
  @Input()
  config;

  @Input()
  group: FormGroup;
  component: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
      this.container.clear();
      if (!dynamicComponents[this.config.widget]) {
        const supportedTypes = Object.keys(dynamicComponents).join(', ');
        throw new Error(
          `Trying to use an unsupported type (${this.config.widget}).
          Supported types: ${supportedTypes}`
        );
      }
      const component:ComponentFactory<any>  = this.resolver.resolveComponentFactory<any>(dynamicComponents[this.config.widget]);
      this.component = this.container.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;

  }

  ngOnDestroy() {
   this.component.destroy();
  }
}
