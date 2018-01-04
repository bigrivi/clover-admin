import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { UserService } from '../../../@core/data/users.service';
import { API_ROOT } from '../../../config';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile',link:'/apps/account/profile' }, { title: 'Log out',link:'/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
     this.userService.userInfoChange().subscribe((userInfo)=>{
        this.user = userInfo
        if(this.user && this.user.avatar){
           this.user.picture = API_ROOT+"uploader/attachments/preview?id="+this.user.avatar;
        }
      })
  }

  ngOnInit() {
     
     
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
