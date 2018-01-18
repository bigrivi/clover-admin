import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HomeWJUANService } from './services/home.service';

@Component({
    selector: 'yhu-home',
    templateUrl: './home.html',
    styleUrls: ['./home.less']
})
export class HomeComponent implements OnInit {

    loading = false;

    //量表
    scaleData: string;

    //题目
    typedata: any[]= [];
    questionData: any = {
        typedata: [],
        labeldata: [],
        quotedata: []
    } ;

    //问卷
    questionnaireData: any = {
        quotedata: [],
        wjuandata: []
    };

    constructor(
        public msg: NzMessageService,
        private homeWJUANService: HomeWJUANService

    ) { }

    ngOnInit() {
        this.homeWJUANService.getScaleData().subscribe((result) => {
        });
        this.homeWJUANService.getQuestionData().subscribe((result) => {
            this.questionData = result;
        });
        this.homeWJUANService.getQuestionnaireData().subscribe((result) => {
            this.questionnaireData = result;
        });
    }
}
