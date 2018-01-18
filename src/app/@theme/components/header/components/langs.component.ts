import { Component } from '@angular/core';
import { SettingsService } from '../../../../@core/services/settings.service';
import { TranslateService } from '../../../../@core/utils/translate.service';
import { Routes, Router,RouterModule,ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
    selector: 'header-langs',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            语言
            <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu>
            <li nz-menu-item *ngFor="let item of translateService.langs"
            [nzSelected]="item.code === translateService.getCurrLang()"
                (click)="change(item.code)">{{item.text}}</li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderLangsComponent {


    constructor(
        public settings: SettingsService,
        public router: Router,
        public translateService:TranslateService
    ) {
    }

    change(lang: string) {
        this.translateService.useLang(lang)
        this.router.navigate(["/lang"],{queryParams: {page: this.router.url}});
        // this.translateService.loadLangs().subscribe((res)=>{
        //     console.log("change complete")
        // })
    }

}
