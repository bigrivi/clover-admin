import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';




@Injectable()
export class HomeWJUANService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * 读取量表信息
     */
    getScaleData(): Observable<any> {
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result = {

            };
            return result;
        });
    }

    /**
     * 读取题目数据
     */
    getQuestionData(): Observable<any> {
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result = {
                typedata: [
                    { x: "单选", y: 8 },
                    { x: "多选", y: 792 },
                    { x: "排序", y: 364 },
                    { x: "开放", y: 585 }
                ],
                labeldata: [
                    { title: "智联测试", total: 779 },
                    { title: "敬业度测试", total: 792 },
                    { title: "其他测试", total: 364 },
                    { title: "模板测试", total: 585 },
                    { title: "QQ测试", total: 949 },
                    { title: "垃圾筐两地分居案例肯", total: 796 }
                ],
                quotedata: [
                    { questionname: "你爱公司吗", questiontype: "单选", count: "55", wjname: "iphone7p" },
                    { questionname: "你是管理者吗", questiontype: "单选", count: "50", wjname: "iphone7p" },
                    { questionname: "你对公司评价", questiontype: "开放题", count: "30", wjname: "iphone7p" },
                    { questionname: "对公司现状满意吗", questiontype: "开放题", count: "22", wjname: "iphone7p" },
                    { questionname: "有什么好的建议给公司", questiontype: "排序题", count: "11", wjname: "iphone7p" }
                ]
            };
            return result;
        });
    }

    /**
     * 读取问卷信息
     */
    getQuestionnaireData(): Observable<any> {
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result = {
                quotedata: [
                    { wjname: "敬业度1期测评", count: "55" },
                    { wjname: "你是管理者吗", count: "50" },
                    { wjname: "你对公司评价", count: "30" },
                    { wjname: "对公司现状满意吗", count: "22" },
                    { wjname: "有什么好的建议给公司", count: "11" }
                ],
                wjuandata: [
                    {
                        wjname: "智联测试", total: 35,
                        analysis: [
                            { x: '敬业度题目', y: 10 },
                            { x: '组织能力题目', y: 15 },
                            { x: '其他题目', y: 10 }
                        ]
                    },
                    {
                        wjname: "敬业度测试", total: 35,
                        analysis: [
                            { x: '敬业度题目', y: 10 },
                            { x: '组织能力题目', y: 15 },
                            { x: '其他题目', y: 10 }
                        ]
                    },
                    {
                        wjname: "其他测试", total: 35,
                        analysis: [
                            { x: '敬业度题目', y: 10 },
                            { x: '组织能力题目', y: 15 },
                            { x: '其他题目', y: 10 }
                        ]
                    },
                    {
                        wjname: "模板测试", total: 35,
                        analysis: [
                            { x: '敬业度题目', y: 10 },
                            { x: '组织能力题目', y: 15 },
                            { x: '其他题目', y: 10 }
                        ]
                    }
                ]
            };
            return result;
        });
    }
}

