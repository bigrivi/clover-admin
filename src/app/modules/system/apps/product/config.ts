import * as _ from 'lodash';
import { Injectable } from '@angular/core';

var category_source = [
	{label: "测试1", value: "1"},
	{label: "测试2", value: "2"}
]



export class ProductService {
	config = {}
    constructor() {
		this.config = {
			resource:"product",
			valueField:"_id",
			labelField:"name",
			addable:true,
			detailable:true,
			name:"产品管理",
			group:["产品基本信息"],
			listHide:["introduction","bar_code","pic","category_id1","test1_1","test1_2","test1_3","test2_1","test2_2","test2_3"],
			modalListShow:["name","price","serial_number"],
			extActions:[
				{
			        label:"product.Order Logs",
			        action:"orderLogs",
			        authNode:"product.orderLogs.get"
			    }
			],
			fields : {
				name:{
					label:"product.Product Name",
					widget:"text",
					sortabld:true,
					group:"1",
                    width:400,
                    fixed:true,
					titleabled :true,
					require:true
				},
				price:{
					label:"product.Product Price",
					widget:"number",
					group:"1",
					sortabld:true,
					formWidth:"halfWidth",
					require:true
				},
				category_id:{
				    label:"类别",
					widget:"select",
					group:"1",
					formWidth:"halfWidth",
					searchable:true,
					populateable:true,
					isParameterData:true,
					dataSource:"dataModel.parameter",
					queryParams:{"group":"product_category"},
					multiple:false,
					require:false,
					get_display:function(item){
						if(item["category_id"])
							return item["category_id"].name
						return ""
					}
				},

				measuring_unit:{
					label:"计量单位",
					widget:"text",
					group:"1",
					formWidth:"halfWidth",
					require:true
				},
				model:{
					label:"模型",
					widget:"text",
					group:"1",
					formWidth:"halfWidth",
					require:true
				},
				producing_area:{
					label:"产地",
					group:"1",
					formWidth:"halfWidth",
					widget:"text",
					require:false
				},
				serial_number:{
					label:"序列号",
					group:"1",
                    widget:"text",
					formWidth:"halfWidth",
					require:true
				},
				bar_code:{
					label:"条形码",
					group:"1",
					widget:"text",
					formWidth:"halfWidth_",
					require:true,
					addable: true,
		            editable: true
				},
				tags:{
					label:"标签",
					searchable:true,
                    group:"1",
                    width:250,
					widget:"select",
					dataSource:"product.tag",
					populateable:true,
					multiple:true,
					require:true,
					get_display:function(item){
						if(item["tags"].length>0){
							let names = _.map(item["tags"],(tag)=>{
								return tag.name
							})
							return names.join("、")
						}
						return "";
					}
				},
				pic:{
					label:"产品图",
					widget:"uploader",
					group:"1",
					formWidth:"halfWidth",
					fullRow:true,
					require:false
				},
				picfff:{
					label:"附件",
					widget:"uploader",
					group:"1",
					formWidth:"halfWidth",
					fullRow:true,
					require:false
				},
				introduction:{
					label:"介绍",
					widget:"textarea",
					fullRow:true,
					require:true
				},
				creation_on:{
					label:"创建时间",
					widget:"datetime",
					sortabld:true,
					fullRow:true,
					require:true
				}

			},
			filters:[
				{
					label:"按分类",
					key:"category_id",
					dataSource:"product.category"
				},
				{
					label:"按标签",
					key:"tags",
					dataSource:"product.tag",
					get_display:function(item){
						return item.name+"("+item.count+")";
					}
				}
			]
		}
	}
}


export class CategoryService {
	config = {}
    constructor() {
		this.config = {
			resource:"category",
			name:"产品分类管理",
			fields : {
				name:{
                    label:"名称",
                    sortabld:true,
					widget:"text",
					fullRow:true,
					titleabled :true,
					require:true
				}
			}
		}
	}

}


export class TagService {
	config = {}
    constructor() {
		this.config = {
			resource:"tag",
			name:"产品标签管理",
			fields : {
				name:{
					label:"名称",
                    sortabld:true,
                    fixed:true,
                    width:500,
					widget:"text",
					fullRow:true,
					titleabled :true,
					require:true
				},
				count:{
					label:"产品数量",
					sortabld:true,
					widget:"text",
					fullRow:true,
					titleabled :false,
					require:false,
					addable: false,
		            editable: false

				}
			}
		}
	}

}


export class OrderLogsService {
	config = {}
    constructor() {
		this.config = {
			resource:"order_logs",
			name:"产品订购记录管理",
			fields : {
				customer:{
					label:"客户",
					widget:"text",
					require:true
				},
				quanity:{
					label:"订购数量",
					sortabld:true,
					widget:"number",
					titleabled :false,
					require:false

				},
				reamrk:{
					label:"备注",
					widget:"textarea",
					titleabled :false,
					require:false
				},
				order_date:{
					label:"订购时间",
					widget:"datetime",
					sortabld:true,
					require:true
				},
				region:{
					label:"所在地区",
					widget:"region",
					require:true
				},
			}
		}
	}

}
