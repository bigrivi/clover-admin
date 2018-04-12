import {ProductConfig,CategoryConfig,TagConfig,OrderLogsConfig} from './apps/product/config'
import {UserInfoConfig,DepartmentConfig,UserRoleConfig,AuthNodeConfig,AuthorizeConfig} from './apps/account/config'
import {AttachmentConfig} from './apps/uploader/config'
import {NavConfig} from './apps/home/config'
import {ResearchConfig} from './apps/research/config'
import {TemplateConfig,EmailConfig,SmsConfig,WinningConfig} from './apps/notification/config'
import {QuestionConfig} from './apps/question/config'


export const ModuleConfig = {
     product :{
        product:ProductConfig,
        category:CategoryConfig,
        tag:TagConfig,
        orderLogs:OrderLogsConfig
      },
      account:{
        userInfo:UserInfoConfig,
        userRole:UserRoleConfig,
        department:DepartmentConfig,
        authNode:AuthNodeConfig,
        authorize:AuthorizeConfig
      },
      home:{
        nav:NavConfig
      },
      uploader:{
        attachment:AttachmentConfig
      },
      research:{
        research:ResearchConfig
      },
      question:{
        question:QuestionConfig
      },
      notification:{
        template:TemplateConfig,
        email:EmailConfig,
        sms:SmsConfig,
        winning:WinningConfig
      }
}