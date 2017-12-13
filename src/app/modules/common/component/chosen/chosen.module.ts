import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChosenDropComponent} from "./chosen-drop.component";
import {ChosenSingleComponent} from "./chosen-single.component";
import {ChosenMultipleComponent} from "./chosen-multiple.component";
import {ChosenItemSelectComponent} from "./item-select.component";


import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent
    
  ],
  entryComponents: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent

  ],
  exports: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent,
    ChosenItemSelectComponent
  ],
  imports: [
  CommonModule,
    FormsModule
  ],
  providers: []
})
export class ChosenModule {

}
