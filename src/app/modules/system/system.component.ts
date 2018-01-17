import { Component } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { NavService } from '../../@core/data/nav.service';
import { TranslateService } from '../../@core/utils/translate.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
   <app-layout>
    </app-layout>
  `,
})
export class SystemComponent {
  menu = [];
  constructor(public route: ActivatedRoute,public navService:NavService,public translateService:TranslateService ) {

    }
}
