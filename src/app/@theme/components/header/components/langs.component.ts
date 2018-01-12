import { Component } from '@angular/core';
// import { TranslatorService } from '@core/translator/translator.service';
import { SettingsService } from '../../../../@core/services/settings.service';

@Component({
    selector: 'header-langs',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            <i class="anticon anticon-down"></i>
        </div>

    </nz-dropdown>
    `
})
export class HeaderLangsComponent {


    constructor(
        public settings: SettingsService,
    ) {
    }

    change(lang: string) {
        //this.settings.setLayout('lang', lang);
    }

}
