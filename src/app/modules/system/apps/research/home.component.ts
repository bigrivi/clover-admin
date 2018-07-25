import { Component,ViewChild,Injector,OnInit} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import {UserService} from '../../../../@core/data/users.service'
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import { SettingsService } from '../../../../@core/services/settings.service';



@Component({
  selector: 'research-home',
  templateUrl: './home.html',
  styleUrls: ['./home.less']
})
export class HomeComponent {
  config;
  params = {};
  loading = false;
  //中奖
  winning: any = {};

  constructor(
    public route: ActivatedRoute,
    public settingsService: SettingsService,
    public messageService: NzMessageService,
    public userService:UserService ) {


  }


  ngOnInit() {
        this.winning = {
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
    }

    _activeTab = 0;
    _tabChange(value: any) {

    }



}
