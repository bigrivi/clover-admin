import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChosenDropComponent} from "./chosen-drop.component";
import {ChosenSingleComponent} from "./chosen-single.component";
import {ChosenMultipleComponent} from "./chosen-multiple.component";
import {ChosenItemSelectComponent} from "./item-select.component";
import {Select3Component} from "./select3.component";


import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent,
    Select3Component
    
  ],
  entryComponents: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent,
    Select3Component

  ],
  exports: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent,
    Select3Component
  ],
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ChosenModule {

}
