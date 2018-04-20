import * as _ from 'lodash';

var category_source = [
	{label: "测试1", value: "1"},
	{label: "测试2", value: "2"}
]
export const ProductConfig = {
	resource:"product",
	module:"product",
	valueField:"_id",
	labelField:"name",
	addable:true,
	detailable:true,
	name:"产品管理",
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
			width:400,
			fullRow:true,
			titleabled :true,
			require:true
		},
		price:{
			label:"product.Product Price",
			widget:"number",
			sortabld:true,
			fullRow:false,
			require:true,
			width:100
		},
		category_id:{
		    label:"类别",
			widget:"select",
			fullRow:false,
			searchable:true,
			populateable:true,
			dataSource:"dataModel.parameter",
			queryParams:{"group":"product_category"},
			multiple:false,
			require:true,
			get_display:function(item){
				if(item["category_id"])
					return item["category_id"].name
				return ""
			}
		},

		measuring_unit:{
			label:"计量单位",
			widget:"text",
			fullRow:false,
			require:true
		},
		model:{
			label:"模型",
			widget:"text",
			fullRow:false,
			require:true
		},
		producing_area:{
			label:"产地",
			fullRow:false,
			widget:"text",
			require:false
		},
		serial_number:{
			label:"序列号",
			widget:"text",
			fullRow:false,
			require:true
		},
		bar_code:{
			label:"条形码",
			widget:"text",
			require:true,
			addable: true,
            editable: true
		},
		tags:{
			label:"标签",
			searchable:true,
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
		creation_on:{
			label:"创建时间",
			widget:"datetime",
			sortabld:true,
			fullRow:true,
			require:true
		},
		pic:{
			label:"产品图",
			widget:"uploader",
			fullRow:true,
			require:false
		},
		introduction:{
			label:"介绍",
			widget:"textarea",
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


export const CategoryConfig = {
	resource:"category",
	module:"category",
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


export const TagConfig = {
	resource:"tag",
	module:"tag",
	name:"产品标签管理",
	fields : {
		name:{
			label:"名称",
			sortabld:true,
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



export const OrderLogsConfig = {
	resource:"order_logs",
	module:"orderLogs",
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
