import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HomeService } from './home.services';
import { SettingsService } from '../../../../@core/services/settings.service';
import { MenuService } from '../../../../@core/services/menu.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    //第一行卡片数据
    cardData: any ={
        answer:{},
        winning:{},
        email:{},
        sms:{}
    };

    //答题趋势数据
    answerData: any[] = [];
    answerLoading = true;

    //报告
    reportData: any[] = [];
    reportLoading = true;
    reportPage = {
        "pageindex": 1,
        "pagesize": 5,
        "pagetotal": 0
    };

    //调研
    surveyData: any[] = [];
    surveyLoading = true;
    surveyPage = {
        "pageindex": 1,
        "pagesize": 5,
        "pagetotal": 0
    };
    constructor(
        public msg: NzMessageService,
        private menuService:MenuService,
        private settingsService: SettingsService,
        private homeService: HomeService
    ) {

    }

    ngOnInit() {
        this.settingsService.setLayout('model','');
        this.homeService.getCardListData().subscribe((result) => {
            this.cardData = result.data;
        });

        this.homeService.getAnswerMonthListData().subscribe((result) => {
            this.answerData = result.data;
            this.answerLoading = false;
        });
        this.menuService.setCurrNav(-1)

        this.loadReportListData();
        this.loadSurveyListData();
    }

    /**
     * 报告数据加载
     */
    loadReportListData(){
        this.reportLoading = true;
        this.homeService.getReportListData(this.reportPage).subscribe((result) => {
            this.reportData = result.data;
            this.reportPage.pageindex = result.page.pageindex;
            this.reportPage.pagesize = result.page.pagesize;
            this.reportPage.pagetotal = result.page.pagetotal;
            this.reportLoading = false;
        });
    }
    /**
     * 报告分页数据加载
     * @param index
     */
    reportPageChange(index: number){
        this.reportPage.pageindex = index;
        this.loadReportListData();
    }

     /**
     * 调研数据加载
     */
    loadSurveyListData(){
        this.surveyLoading = true;
        this.homeService.getSurveyListData(this.surveyPage).subscribe((result) => {
            this.surveyData = result.data;
            this.surveyPage.pageindex = result.page.pageindex;
            this.surveyPage.pagesize = result.page.pagesize;
            this.surveyPage.pagetotal = result.page.pagetotal;
            this.surveyLoading = false;
        });
    }
    /**
     * 调研分页数据加载
     * @param index
     */
    surveyPageChange(index: number){
        this.surveyPage.pageindex = index;
        this.loadSurveyListData();
    }
}
