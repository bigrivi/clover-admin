import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '../../../@core/services/settings.service';

@Component({
    selector: 'app-header-main',
    templateUrl: './header-main.component.html'
})
export class HeaderMainComponent {

    constructor(public settings: SettingsService) { }

}
