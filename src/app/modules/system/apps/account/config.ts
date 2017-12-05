import * as _ from 'lodash';

var gender_source = [
	{label: "男", value: "1"},
	{label: "女", value: "2"},
]

export const UserInfoConfig = {
	resource:"users",
	module:"userInfo",
	valueField:"_id",
	labelField:"username",
	addable:false,
	name:"用户管理",
	listHide:["password_hash","avatar"],
	fields : {
		username:{
			label:"用户名",
			widget:"text",
			sortabld:true,
			searchable:true,
			width:400,
			titleabled :true,
			require:true
		},
		password_hash:{
			label:"密码",
			widget:"password",
			sortabld:false,
			require:true,
			width:100,
			editable: false
		},
		realname:{
			label:"真实姓名",
			widget:"text",
			sortabld:true,
			searchable:true,
			require:true
		},
		gender:{
			label:"性别",
			widget:"radio",
			dataSource:gender_source,
			require:true,
			get_display:function(item){
				if(item.gender=="1")
					return "男"
				else if(item.gender=="2")
					return "女"
				else
					return "";
			}
		},
		email:{
			label:"Email",
			widget:"text",
			require:true
		},
		creation_on:{
			label:"创建时间",
			widget:"datetime",
			require:true,
			addable: false,
            editable: false
		},
		avatar:{
			label:"用户头像",
			widget:"uploader",
			require:true
		}
	},
	filters:[
		
	]
}


