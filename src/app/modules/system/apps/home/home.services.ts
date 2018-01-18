import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
const result = {
  code: 0,
  msg: "",
  data: null,
};
const resultpage = {
  code: 0,
  msg: "",
  data: null,
  page: null
};

//卡片数据
const cardlist = [];
for (let i = 1; i < 22; i += 1) {
  cardlist.push({
    x: `2017-12-${i}`,
    y: Math.random() *1000
  });
}

//卡片数据
export function mockdata_getHomeCardList() {
  let array = {
    answer: {
      total: 5550,
      day: 120,
      list: cardlist
    },
    winning: {
      total: 5550,
      day: 120,
      list: cardlist
    },
    email: {
      total: 5550,
      day: 120,
      list: cardlist
    },
    sms: {
      total: 5550,
      day: 120,
      list: cardlist
    }
  }
  let res = result;
  res.data = array;
  return res;
}


//答题趋势数据
export function mockdata_getAnswerMonthList() {
  let answerlist = [];
  for (let i = 1; i <= 12; i += 1) {
    answerlist.push({
      x: `${i}月`,
      y: Math.random()*1000
    });
  }
  let res = result;
  res.data = answerlist;
  return res;
}

const reportlist = [];
for (let i = 0; i < 22; i += 1) {
  reportlist.push({
        id: `${i}`,
        name: `PPT报告-${i}`,
        createdat: `2017-07-${Math.floor(i / 2) + 1}`,
        completiondat: `2017-07-${Math.floor(i / 2) + 2}`
    });
}

export function mockdata_getReportList(params: any) {
  let array = [...reportlist];
  let total = reportlist.length;
  let beginno = (params.pageindex - 1) * params.pagesize;
  array = (beginno + params.pagesize >= array.length) ? array.slice(beginno, array.length) : array.slice(beginno, beginno + params.pagesize);
  let res = resultpage;
  res.data = array;
  res.page = {
    "pageindex": params.pageindex,
    "pagesize": params.pagesize,
    "pagetotal": total
  }
  return res;
}


const dyanlist = [];
for (let i = 0; i < 21; i += 1) {
  dyanlist.push({
        id: `${i}`,
        name: `PPT报告-${i}`,
        releasedat: `2017-07-${Math.floor(i / 2) + 1}`,
        recovery: "10/2"
    });
}

export function mockdata_getSurveyList(params: any) {
  let array = [...dyanlist];
  let total = dyanlist.length;
  let beginno = (params.pageindex - 1) * params.pagesize;
  array = (beginno + params.pagesize >= array.length) ? array.slice(beginno, array.length) : array.slice(beginno, beginno + params.pagesize);
  let res = resultpage;
  res.data = array;
  res.page = {
    "pageindex": params.pageindex,
    "pagesize": params.pagesize,
    "pagetotal": total
  }
  return res;
}


@Injectable()
export class HomeService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * 读取卡片数据
     */
    getCardListData(): Observable<any> {
        return this.httpClient.get('assets/app-data.json').map(res => {
            return mockdata_getHomeCardList();
        });
    }

    /**
     * 读取答题趋势图
     */
    getAnswerMonthListData(): Observable<any> {
        return this.httpClient.get('assets/app-data.json').map(res => {
            return mockdata_getAnswerMonthList();
        });
    }

    /**
     * 读取报告
     * @param page
     */
    getReportListData(page): Observable<any> {
        let params = {
            "pageindex":page.pageindex,
            "pagesize":page.pagesize
        }
        return this.httpClient.get('assets/app-data.json').map(res => {
            return mockdata_getReportList(params);
        });
    }

    /**
     * 读取调研活动
     * @param page
     */
    getSurveyListData(page): Observable<any> {
        let params = {
            "pageindex":page.pageindex,
            "pagesize":page.pagesize
        }
        return this.httpClient.get('assets/app-data.json').map(res => {
            return mockdata_getSurveyList(params);
        });
    }
}

