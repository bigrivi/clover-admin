import { ComponentFactoryResolver, ComponentRef, ComponentFactory, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputFieldComponent } from '../component/form-view/form-fields/input.comonent';
import { SelectFieldComponent } from '../component/form-view/form-fields/select.comonent';
import { DateFieldComponent } from '../component/form-view/form-fields/date.comonent';
import { RadioButtonFieldComponent } from '../component/form-view/form-fields/radio.comonent';
import {UploaderFieldComponent} from '../component/form-view/form-fields/uploader.comonent';
import { CheckboxFieldComponent } from '../component/form-view/form-fields/checkbox.comonent';


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
  checkbox:CheckboxFieldComponent
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
