import * as _ from 'lodash';


export const ResearchConfig = {
	resource:"research",
	module:"research",
	name:"调研管理",
	treeable:false,
	actions:["edit","authorize","delete"],
	fields : {
		name:{
			label:"名称",
			widget:"text",
			titleabled :true,
			require:true
		},
		enabled_status:{
			label:"启用状态",
			widget:"text",
			require:true
		},
		research_status:{
			label:"调研状态",
			widget:"text",
			require:true
		},
	}
}








