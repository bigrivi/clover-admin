import * as _ from 'lodash';

var category_source = [
	{label: "测试1", value: "1"},
	{label: "测试2", value: "2"},
	{label: "测试3", value: "3"},
	{label: "测试4", value: "4"},
]
export const ProductConfig = {
	resource:"products",
	module:"product",
	valueField:"_id",
	labelField:"name",
	addable:false,
	name:"产品管理",
	listHide:["introduction","bar_code","pic"],
	modalListShow:["name","price","serial_number"],
	fields : {
		name:{
			label:"产品名",
			widget:"text",
			sortabld:true,
			searchable:true,
			width:400,
			titleabled :true,
			require:true
		},
		price:{
			label:"价格",
			widget:"number",
			sortabld:true,
			require:true,
			width:100
		},
		category_id:{
			label:"类别",
			widget:"select",
			populateable:true,
			dataSource:"product.category",
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
			require:true
		},
		model:{
			label:"模型",
			widget:"text",
			searchable:true,
			require:true
		},
		producing_area:{
			label:"产地",
			widget:"text",
			require:true
		},
		serial_number:{
			label:"序列号",
			widget:"text",
			require:true
		},
		bar_code:{
			label:"条形码",
			widget:"text",
			require:true,
			addable: true,
            editable: false
		},
		tags:{
			label:"标签",
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
			searchable:true,
			require:true
		},
		pic:{
			label:"产品图",
			widget:"uploader",
			require:false
		},
		introduction:{
			label:"介绍",
			widget:"textarea",
			require:true
		},

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
	resource:"categories",
	module:"category",
	name:"产品分类管理",
	fields : {
		name:{
			label:"名称",
			sortabld:true,
			widget:"text",
			titleabled :true,
			require:true
		}
	}
}


export const TagConfig = {
	resource:"tags",
	module:"tag",
	name:"产品标签管理",
	fields : {
		name:{
			label:"名称",
			sortabld:true,
			widget:"text",
			titleabled :true,
			require:true
		},
		count:{
			label:"产品数量",
			sortabld:true,
			widget:"text",
			titleabled :false,
			require:false,
			addable: false,
            editable: false

		}
	}
}