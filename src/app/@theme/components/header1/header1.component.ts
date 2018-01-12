import { Component, Input, OnInit,Injector } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { UserService } from '../../../@core/data/users.service';
import { NavService } from '../../../@core/data/nav.service';
import { TranslateService } from '../../../@core/utils/translate.service';
import { API_ROOT } from '../../../config';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header1.component.scss'],
  templateUrl: './header1.component.html',
})
export class Header1Component implements OnInit {


  @Input() position = 'normal';

  user: any;

  navs = []

  activeNavIndex = 0;

  userMenu = [{ title: 'Profile',link:'/apps/account/profile' }, { title: 'Log out',link:'/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              public injector:Injector,
              public translateService:TranslateService,
              private userService: UserService,
              private navService:NavService,
              private analyticsService: AnalyticsService) {
     this.userService.userInfoChange().subscribe((userInfo)=>{
        this.user = userInfo
        if(this.user && this.user.avatar){
           this.user.picture = API_ROOT+"uploader/attachments/preview?id="+this.user.avatar;
        }
      })
  }

  ngOnInit() {
     let resource = this.injector.get("home.navDataApi").resource
     setTimeout(()=>{
        resource.get().map(res=>res.json()).subscribe((res)=>{
             this.navService.setNavData(res)
             this.navs = res;
             this.selectedNav(0)
             console.log(res)
        })
      },100)


      this.navService.onNavChangeState().subscribe((index)=>{
         this.activeNavIndex = index;
      })

  }

  selectedNav(activeIndex){
    this.navService.setCurrNav(activeIndex)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
