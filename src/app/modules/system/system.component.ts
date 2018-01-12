import { Component } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './pages-menu';
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
    	this.route.params.subscribe(params => {

      });

      this.navService.onNavChangeState().subscribe((index)=>{
          var navData = this.navService.getNavData()[index]
          var menus = []
          if(navData){
             navData["children"].forEach((item1)=>{
                var menuItem = {
                    title: this.translateService.instant(item1.app+"."+item1.alias),
                    icon: item1.icon,
                    home:true,
                    children:[]
                }
                var childres = []
                item1["children"].forEach((item2)=>{
                    childres.push({
                       title: this.translateService.instant(item2.app+"."+item2.alias),
                       link: '/apps/'+item2.link,
                    })
                })
                menuItem.children = childres
                menus.push(menuItem)

            })
             this.menu = menus;
          }

      })
    }
}
