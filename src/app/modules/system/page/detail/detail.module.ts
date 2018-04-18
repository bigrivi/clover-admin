import { NgModule,InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import { DetailComponent } from './detail.component'
import { DetailViewComponent } from './detail-view.component'
import { ListViewComponent } from './list-view.component'


import { ThemeModule } from '../../../../@theme/theme.module';
import {CommonModule} from "../../../common/common.module"


// export function createDataApiProvider(http: Http,pubsub:PubSubService,authService:NbAuthService,tokenService:NbTokenService) {
//     return new DataApiService("fff", {}, http,pubsub,authService,tokenService);
// }



const routes: Routes = [
  {
    path:"",component:DetailComponent,
    children:[
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'detail',component: DetailViewComponent },
      { path: ':module',component: ListViewComponent }
    ]

  }

];


@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DetailComponent,
    DetailViewComponent,
    ListViewComponent
  ],
  entryComponents: [


  ],
  providers: [

  ],
  exports: [

  ],
})
export class DetailModule {
  constructor(
  ) {

  }
}
