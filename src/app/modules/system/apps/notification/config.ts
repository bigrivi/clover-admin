import * as _ from 'lodash';
import { Injectable } from '@angular/core';

var status_source = [
	{label: "启用", value: 1},
	{label: "禁用", value: 2}
]

var enabled_status_source = [
	{label: "是", value: 1},
	{label: "否", value: 2}
]

var diaoyan_status_source = [
	{label: "调研发送成功", value: 1},
	{label: "调研发送失败", value: 2}
]



export class TemplateService {
	config = {}
    constructor() {
		this.config = {
			resource:"template",
			name:"模板管理",
			treeable:false,
			fields : {
				name:{
					label:"名称",
					widget:"text",
					titleabled :true,
					require:true
				},
				kind:{
					label:"类型",
					widget:"text",
					require:true
				},
				project:{
					label:"调用项目",
					widget:"text",
					require:true
				},
				status:{
					label:"状态",
					widget:"select",
					dataSource:status_source,
					require:true,
					get_display:function(item){
						if(item["status"]==1)
							return "启用"
						else if(item["status"]==2)
							return "禁用"
						return ""
					}
				}
			}
		}
	}

}



export class EmailService {
	config = {}
    constructor() {
		this.config = {
			resource:"email",
			name:"邮件管理",
			treeable:false,
			fields : {
				active_name:{
					label:"调研活动名称",
					widget:"text",
					titleabled :true,
					require:true
				},
				template_name:{
					label:"模板名称",
					widget:"text",
					require:true
				},
				pici:{
					label:"批次",
					widget:"text",
					require:true
				},
				sended_total:{
					label:"发送总量",
					widget:"number",
					require:true
				},
				sended_success:{
					label:"发送成功",
					widget:"number",
					require:true
				},
				sending_total:{
					label:"发送中",
					widget:"number",
					require:true
				}
			}
		}
	}

}

export class SmsService {
	config = {}
    constructor() {
		this.config = {
			resource:"sms",
			name:"短信管理",
			treeable:false,
			fields : {
				active_name:{
					label:"调研活动名称",
					widget:"text",
					titleabled :true,
					require:true
				},
				template_name:{
					label:"模板名称",
					widget:"text",
					require:true
				},
				pici:{
					label:"批次",
					widget:"text",
					require:true
				},
				sended_total:{
					label:"发送总量",
					widget:"number",
					require:true
				},
				sended_success:{
					label:"发送成功",
					widget:"number",
					require:true
				},
				sending_total:{
					label:"发送中",
					widget:"number",
					require:true
				}
			}
		}
	}

}


export class WinningService {
	config = {}
    constructor() {
		this.config = {
			app:"notification",
			resource:"winning",
			module:"winning",
			name:"中奖管理",
			treeable:false,
			fields : {
				active_name:{
					label:"调研活动名称",
					widget:"text",
					titleabled :true,
					require:true
				},
				enabled_status:{
					label:"启用状态",
					widget:"select",
					dataSource:enabled_status_source,
					require:true,
					get_display:function(item){
						if(item["enabled_status"]==1)
							return "是"
						else if(item["status"]==2)
							return "否"
						return ""
					}
				},
				diaoyan_status:{
					label:"调研状态",
					widget:"select",
					dataSource:diaoyan_status_source,
					require:true,
					get_display:function(item){
						if(item["diaoyan_status"]==1)
							return "调研发布成功"
						else if(item["diaoyan_status"]==2)
							return "调研发布失败"
						return ""
					}
				}
			}
		}
	}

}
