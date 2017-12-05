import { Component } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
   <app-base-layout>
       <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-base-layout>
  `,
})
export class SystemComponent {
  menu = MENU_ITEMS;
  constructor(public route: ActivatedRoute ) {
    	this.route.params.subscribe(params => {
       
      });
    }
}
