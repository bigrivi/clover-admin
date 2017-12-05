import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ChosenDropComponent} from "./chosen-drop.component";
import {ChosenSingleComponent} from "./chosen-single.component";
import {ChosenMultipleComponent} from "./chosen-multiple.component";
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent
    
  ],
  entryComponents: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent

  ],
  exports: [
    ChosenSingleComponent,
    ChosenMultipleComponent,
    ChosenDropComponent
  ],
  imports: [
  CommonModule,
    FormsModule
  ],
  providers: []
})
export class ChosenModule {

}
