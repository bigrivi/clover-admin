import {ProductService, CategoryService, TagService, OrderLogsService} from './apps/product/config';
import {UserInfoService, DepartmentService, UserRoleService, AuthNodeService, AuthorizeService} from './apps/account/config';
import {AttachmentService} from './apps/uploader/config';
import {NavService} from './apps/home/config';
import {ResearchService} from './apps/research/config';
import {TemplateService, EmailService, SmsService, WinningService} from './apps/notification/config';
import {QuestionService} from './apps/question/config';
import {ParameterService} from './apps/dataModel/config';

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
