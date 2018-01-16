import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HomeTZHIService {

    constructor(
        private httpClient: HttpClient
    ){
    }

    /**
     * 读取模板信息
     */
    getTemplateData(): Observable<any>{
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result={
                "emailOK": 200,
                "emailERROR": 2,
                "smsOK": 300,
                "smsERROR": 30
            };
            return result;
        });
    }

    /**
     * 读取邮件
     */
    getEamilData(): Observable<any>{
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result={
                chartdata: [
                    { x: "1月", y: 779 },
                    { x: "2月", y: 792 },
                    { x: "3月", y: 364 },
                    { x: "4月", y: 585 },
                    { x: "5月", y: 949 },
                    { x: "6月", y: 796 },
                    { x: "7月", y: 411 },
                    { x: "8月", y: 1068 },
                    { x: "9月", y: 1156 },
                    { x: "10月", y: 1095 },
                    { x: "11月", y: 544 },
                    { x: "12月", y: 1102 }
                ],
                listdata: [
                    { title: "智联测试", total: 779 },
                    { title: "敬业度测试", total: 792 },
                    { title: "其他测试", total: 364 },
                    { title: "模板测试", total: 585 },
                    { title: "QQ测试", total: 949 },
                    { title: "垃圾筐两地分居案例肯", total: 796 }
                ],
                status: [
                    { x: "发送成功", y: 100 },
                    { x: "发送失败", y: 1 },
                    { x: "等待发送", y: 200 },
                    { x: "发送中", y: 51 }
                ]
            };
            return result;
        });
    }

    /**
     * 读取短信信息
     */
    getSMSData(): Observable<any>{
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result={
                chartdata: [
                    { x: "1月", y: 779 },
                    { x: "2月", y: 792 },
                    { x: "3月", y: 364 },
                    { x: "4月", y: 585 },
                    { x: "5月", y: 949 },
                    { x: "6月", y: 796 },
                    { x: "7月", y: 411 },
                    { x: "8月", y: 1068 },
                    { x: "9月", y: 1156 },
                    { x: "10月", y: 1095 },
                    { x: "11月", y: 544 },
                    { x: "12月", y: 1102 }
                ],
                listdata: [
                    { title: "智联测试", total: 779 },
                    { title: "敬业度测试", total: 792 },
                    { title: "其他测试", total: 364 },
                    { title: "模板测试", total: 585 },
                    { title: "QQ测试", total: 949 },
                    { title: "QQ测试2", total: 796 }
                ],
                status: [
                    { x: "发送成功", y: 1200 },
                    { x: "发送失败", y: 12 },
                    { x: "等待发送", y: 2020 },
                    { x: "发送中", y: 512 }
                ]
            };
            return result;
        });
    }

    /**
     * 读取获奖信息
     */
    getWinningData(): Observable<any>{
        return this.httpClient.get('assets/app-data.json').map(res => {
            var result={
                chartdata: [
                    { id: 1, name: "智联测试", cvr: 0.3 ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]} ,
                    { id: 2, name: "敬业度测试", cvr: 0.7 ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 3, name: "其他测试", cvr: 0.4  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 4, name: "模板测试", cvr: 0.2  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 5, name: "QQ测试", cvr: 0.6  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 6, name: "QQ测试2", cvr: 0.3  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 7, name: "QQ测试3", cvr: 0.7  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 8, name: "QQ测试4", cvr: 0.2  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 9, name: "QQ测试5", cvr: 0.3  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]},
                    { id: 10, name: "QQ测试6", cvr: 0.6  ,listdata: [
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-05" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-04" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-03" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-02" },
                        { empname: "张三", empcode: "knx001", redeemcode: "kxgt", prize: "iphone7p", status: "已发放", createdate: "2017-12-01" }
                    ]}
                ]
            };
            return result;
        });
    }
}

