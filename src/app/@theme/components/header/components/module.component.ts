import { Component,Injector } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../@core/services/settings.service';
import { NavService } from '../../../../@core/data/nav.service';
import { MenuService } from '../../../../@core/services/menu.service';

@Component({
    selector: 'header-module',
    template: `
    <a *ngFor="let item of navs;let i=index" [class.model-selected]='activeNavIndex==i' (click)="selectedNav(i)">{{item.alias | translate}}</a>
    `
})
export class HeaderModuleComponent {
    navs = []

    activeNavIndex = 0;

    constructor(
        public router: Router,
        public injector:Injector,
        private menuService:MenuService,
        public settingsService: SettingsService
    ) {
    }

    ngOnInit() {
     let resource = this.injector.get("home.navDataApi").resource
      resource.get().map(res=>res.json()).subscribe((res)=>{
           this.menuService.setData(res)
           this.navs = res;
      })


      this.menuService.onNavChangeState().subscribe((index)=>{
           this.activeNavIndex = index;
      })

   }

    selectedNav(activeIndex){
        //点击后才触发home行为
        this.menuService.setCurrNav(activeIndex)
        if(this.navs[activeIndex]){
            let subMenus = this.navs[activeIndex]["children"]
            if(subMenus && subMenus.length>0){
               if(subMenus[0].link && subMenus[0].link.indexOf("home")>=0){
                    this.router.navigate(['/apps/'+subMenus[0].link]);
                }
            }
        }

    }


    gotomodel(model: string) {
        this.settingsService.setLayout("model",model);
        this.router.navigate([model]);
    }

    ngOnDestroy(){
        console.log("module destroy")
    }
}
