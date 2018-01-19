import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '../../@core/utils/translate.service';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

@Component({
    selector: 'lang-switching',
    template: '<p style="text-align:center;padding-top:10px;">语言切换中.....</p>'
})
export class HomeComponent implements OnInit {
    constructor(
        public msg: NzMessageService,
        public router: Router,
        public route: ActivatedRoute,
        private translateService:TranslateService,
    ) {

    }

    redirect = "";

    ngOnInit() {
        this.route.queryParams.subscribe(params=> {
          this.redirect = params.page;

        })

        this.translateService.loadLangs().subscribe((result) => {

          if (this.redirect) {
            setTimeout(() => {
              return this.router.navigateByUrl(this.redirect);
            }, 1000);
          }
          else{
              this.router.navigateByUrl("/apps/home");
          }
        });


    }




}
