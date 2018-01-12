import { Component, Input, ViewEncapsulation, ElementRef, TemplateRef, ContentChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

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
        // const menus = this.menuSrv.getPathByUrl(this.route.url);
        // if (menus.length <= 0) return;
        const paths: any[] = [];

        // //加载模块名称
        // let model = this.settingsService.layout.model;
        // switch (model) {
        //     case "dyan":
        //         paths.push({ title: "调研管理", link: null });
        //         break;
        //     case "wjuan":
        //         paths.push({ title: "问卷管理", link: null });
        //         break;
        //     case "tzhi":
        //         paths.push({ title: "通知管理", link: null });
        //         break;
        //     case "yhu":
        //         paths.push({ title: "用户管理", link: null });
        //         break;
        // }
        //加载菜单导航
        // menus.forEach(item => {
        //     let title;
        //     // if (item.translate) title = this.translatorSrv.fanyi(item.translate);
        //     paths.push({ title: title || item.text, link: item.link && [item.link] });
        // });
        this.paths = paths;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.routeChangeSub) {
            this.routeChangeSub.unsubscribe()
            this.routeChangeSub = null;
        }

    }
}
