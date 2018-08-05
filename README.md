clover admin 
=========================
* 作者：andy.sun
* 制作日期：2018-08-5
* Email: sunjiangong@gmail.com

##利用angualr做的一套自动化数据管理系统
====

前端 angualr5
后端 nodeJs+MongoDB

前端架构如下：<br>
   框架:angular5<br>
   UI:采用NG-ZORR 0.6版本<br>

后端nodejs采用thinkjs实现基本的mvc [clover-admin-server](https://github.com/sunjianghong/clover-admin-server)

关于
------------------------
> 
我们知道，传统的方式，比如以前的asp,php,jsp,asp.net,ruby on rails的方式做一个数据维护的CRUD程序的工作量是非常大的，而且很多重复性的代码，比如我们要做一个产品管理的功能，可能先要写一个ProductController
并在里面写对应的add,edit,update,delete等方法，并每个action都对应一个template页面，并写一个对应的service去实现对应的增删改查方法
这样写就有一个问题，如果一个系统有大量类似的功能，这样会堆积大量的类似的逻辑，页面量是量级的倍增
但是现在随着前端的发展，前后端分离的思想已经很成熟了，并且前端出现了很多重量级MVVM框架，比如angular/vue/react
我们现在可以通过前端去做组件化开发，并由前端的路由去控制整个系统
，渲染全部放在前端，后端只做业务逻辑和数据传输，返回给前端的只是一些json数据
这样带来的好处就是大量重用性的前端组件，通用视图,再辅以restfulapi的设计，如果我们开发一个新的模块，只需要通过一些配置就能完成对应的功能,这样能减少大量的重用性工作，极大的提高开发效率以及维护成本


###主要核心思想如下:
- 通用的列表视图ListView
- 通用的编辑视图EditView
- 通用的详细视图DetailView
- 并加上RABC角色管理系统去管理对应的资源节点
- 通用的查询视图<br>
模型的配置对应的字段以及相关字段类型<br>
配置如下实例代码:<br>
``` Typescript
export class UserInfoService {
config = {}
constructor() {
    this.config = {
        app:"account",
        resource:"user_info",
        module:"userInfo",
        valueField:"_id",
        labelField:"username",
        name:"用户管理",
        listHide:["password_hash","avatar"],
        fields : {
            username:{
                label:"用户名",
                widget:"text",
                sortabld:true,
                fixed:true,
                searchable:true,
                width:200,
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
            hobby:{
                label:"兴趣爱好",
                widget:"checkbox",
                width:300,
                dataSource:hobby_source,
                require:true,
            },
            email:{
                label:"Email",
                widget:"text",
                width:200,
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
            },
            department_id:{
                label:"所在部门",
                widget:"select",
                dataSource:"account.department",
                populateable:true,
                require:true,
                get_display:function(item){
                    if(item["department_id"])
                        return item["department_id"].name
                    return ""
                }
            },
            role_id:{
                label:"所属角色",
                widget:"select",
                populateable:true,
                dataSource:"account.userRole",
                require:true,
                get_display:function(item){
                    if(item["role_id"])
                        return item["role_id"].name
                    return ""
                }
            }
        },
        filters:[
            {
                label:"按部门",
                tree:true,
                key:"department_id",
                dataSource:"account.department"
            },
            {
                label:"所属角色",
                key:"role_id",
                dataSource:"account.userRole"
            }
        ]
    }
}
}
```
``` Typescript
新增模块只需在app目录添加对应的配置confit.ts设置即可
并在system/confit.ts设置对应的Service即可

export const ModuleConfig = {
    product: {
        product: ProductService,
        category: CategoryService,
        tag: TagService,
        orderLogs: OrderLogsService,
    },
    account: {
        userInfo: UserInfoService,
        userRole: UserRoleService,
        department: DepartmentService,
        authNode: AuthNodeService,
        authorize: AuthorizeService,
    },
    home: {
        nav: NavService,
    },
    uploader: {
        attachment: AttachmentService,
    },
    research: {
        research: ResearchService,
    },
    question: {
        question: QuestionService,
    },
    notification: {
        template: TemplateService,
        email: EmailService,
        sms: SmsService,
        winning: WinningService,
    },
    dataModel: {
        parameter: ParameterService,
    },
};
```
配置对应模型的restful api resource以及模型的fields<br>
每个模型的配置都设置成为一个service在系统启动的时候注入系统，可以在任何地方拿到<br>
然后实现一套通用的路由系统<br>
比如/#/apps/crm/product<br>
表示app是crm,对应的模块是product,系统会把所有类似的路由都又
ListViewComponent去接受，然后通过拿到对应的app,module,去service拿对应的配置，然后去请求restful api拿服务器给的数据<br>
修改更新也是相同的道理

## 丰富的表单组件
- 单行文本 text
- 多行文本 textarea
- 日期 date
- 日期时间 datetime
- select单选 select mode="single"
- select多选 select mode="multiple"
- raido单选组 raido
- checkbox多选组 checkbox
- 区域联动 region
- 上传文件/图片 uploader
- select3 模块弹窗多选

## 相关截图

### 通用的表格数据列表系统
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/table-view.jpg)
### 固定列
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/fix-column.jpg)
### 通用的表单视图
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/form-view.jpg)
### 灵活的表单列设计，可设置2列或者2列
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/form-single.jpg)
### 列表的高级搜索
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/search.jpg)
### 通用的数据导出功能
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/data-export.jpg)
### 通用的数据详细视图功能
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/detail-view.jpg)
### 通用的子模块系统
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/sub-module.jpg)
### 丰富的图表
![image](https://raw.githubusercontent.com/sunjianghong/clover-admin/master/screenshots/charts.jpg)