import { Component, Input, ViewEncapsulation, ElementRef, TemplateRef, ContentChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {TranslateService} from '../../../@core/utils/translate.service'
import {pascalCaseSpace} from '../../../modules/common/utils/common.utils'
import {parseNodesByUrl} from  '../../../modules/common/utils/route.utils'

@Component({
    selector: 'pro-header',
    template: `
    <ng-container *ngIf="!breadcrumb; else breadcrumb">
        <nz-breadcrumb>
            <nz-breadcrumb-item *ngFor="let i of paths">
                <ng-container *ngIf="i.link"><a [routerLink]="i.link">{{i.title}}</a></ng-container>
                <ng-container *ngIf="!i.link">{{i.title}}</ng-container>
            </nz-breadcrumb-item>
        </nz-breadcrumb>
    </ng-container>
    `,
    styleUrls: ['./pro-header.less'],
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[class.content__title]': 'true',
        '[class.pro-header]': 'true'
    }
})
export class ProHeaderComponent implements OnInit {

    // region fields

    @Input() title: string;

    /**
     * 自动生成导航，以当前路由从主菜单中定位
     */
    @Input() autoBreadcrumb = true;

    paths: any[] = [];

    @ContentChild('breadcrumb') breadcrumb: TemplateRef<any>;

    @ContentChild('logo') logo: TemplateRef<any>;

    @ContentChild('action') action: TemplateRef<any>;

    @ContentChild('content') content: TemplateRef<any>;

    @ContentChild('extra') extra: TemplateRef<any>;

    @ContentChild('tab') tab: TemplateRef<any>;

    // endregion

    routeChangeSub: any;

    constructor(
        private translateService:TranslateService,
        private route: Router
    ) {
        this.routeChangeSub = this.route.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.genBreadcrumb();
            }
        });
    }



    private genBreadcrumb() {
        if (this.breadcrumb || !this.autoBreadcrumb) return;
        let url = this.route.url;
        let routerArr = parseNodesByUrl(url)
        const paths: any[] = [];
        routerArr.forEach((item,index)=>{
            if(index==0){
                //app name
                paths.push({ title: this.translateService.instant(item+".NAV_NAME"), link: null });
            }
            else if(index==1 && routerArr.length>2){
                const node = routerArr[0]+"/"+routerArr[1]
                paths.push({ title: this.translateService.instant(routerArr[0]+".Modules."+pascalCaseSpace(item)), link: node});
            }
            else{
                paths.push({ title: this.translateService.instant(routerArr[0]+".Modules."+pascalCaseSpace(item)), link: null });
            }
        })
        this.paths = paths;
    }

    ngOnInit() {
        this.genBreadcrumb();
    }

    ngOnDestroy() {
        if (this.routeChangeSub) {
            this.routeChangeSub.unsubscribe()
            this.routeChangeSub = null;
        }

    }
}
